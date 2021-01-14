//////////////////////////////////////////////////////////////////////////////////////

Map.setOptions('SATELLITE');
Map.setCenter(74, 3, 6);

var atolls = ee.FeatureCollection ('users/zubba1989/atoll_admin_bund');

//////////////////////////////////////////////////////////////////////////////////////

var panel = ui.Panel({style: {width:'800px', position: 'bottom-left' }});
ui.root.add(panel);

panel.add(ui.Label({value: '||  Atoll Chlorophyll Explorer ||',
  style: {
    fontWeight: 'bold',
    fontFamily: 'sans',
    fontSize: '25px',
    margin: '0 0 4px 0',
    textAlign: 'Center',
    color: '#b31b1b',
    padding: '10px'
    }
}));


panel.add(ui.Label({value: 'Select the adminstrative Atoll from the drop down menu to get approximate Surface Chlorophyll across the atoll over time. The atoll boundaries are presented as approximate adminstrative boundaries and coverage is provided for nearly all of the atolls. Where data is not available, it is suggested to use estimates from the nearest atoll. Chlorophyll is derived from the  Sentinel-3 dataset from the ECMWF/Copernicus Climate Change Service, using the Non Descriptive Chlorophyl Index. To select a new atoll press the reset button.',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    fontFamily: 'sans',
    color: '#000000',
    //border : '1px solid black',
    padding: '10px'
    }
}));



panel.add(ui.Label({value: 'Select the start and end dates (YYYY-MM-DD) to plot time series of Chlorophyll-a distribution. To reduce processing time and minimize resource usage it is suggested to use a suitable temporal scale.',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    fontFamily: 'sans',
    color: '#000000',
    //border : '1px solid black',
    padding: '10px'
    }
}));



//////////////////////////////////////////////////////////////////////////////////////

var selectStartYear = ui.Textbox({placeholder: 'Start',  value: '2000-01-01',
  style: {width: '100px'}}); 
var selectEndYear = ui.Textbox({placeholder: 'End',  value: '2019-12-31',
  style: {width: '100px'}}); 
var start_label = ui.Label('Start Date',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var end_label = ui.Label('End Date',
  {margin: '0 0 0 70px',fontSize: '12px',color: 'gray'});
  
var startRange_subtext = ui.Panel([start_label, end_label],
  ui.Panel.Layout.flow('horizontal'));
var nextRow = ui.Panel([selectStartYear, selectEndYear],
  ui.Panel.Layout.flow('horizontal'));
panel.add(startRange_subtext).add(nextRow);

//print (start_label, selectStartYear)
//print (end_label, selectEndYear)




//////////////////////////////////////////////////////////////////////////////////////


var islandSelect = ui.Select({
  items : [
    
    {label:'Haa Alif Atoll (Thiladhunmathi Uthuruburi)', value : 'Haa_Alif'},
    {label:'Haa Dhaal Atoll (Thiladhunmathi Dhekunuburi)', value : 'Haa_Dhaal'},
    {label:'Shaviyani Atoll (Miladhunmadulu Uthuruburi)', value : 'Shaviyani'},
    {label:'Noonu Atoll (Miladhunmadulu Dhekubunuru)', value : 'Noonu'},
    {label:'Raa Atoll (Maalhosmadulu Uthuruburi)', value : 'Raa'},
    {label:'Baa Atoll (Maalhosmadulu Dhekunuburi)', value : 'Baa'},
    {label:'Lhaviyani Atoll (Faadhippolhu)', value : 'Lhaviyani'},
    {label:'Kaafu Atoll (Maale atholhu)', value : 'Kaafu'},
    {label:'Alif_Alif Atoll (Ari atholhu Uthuruburi)', value : 'Ga.Dhiyadhoo'},
    {label:'Alif_Dhaal Atoll (Ari atholhu Dhekunuburi)', value : 'Alif_Alif'},
    {label:'Vaavu Atoll (Felidhe Atolhu)', value : 'Vaavu'},
    {label:'Meemu Atoll (Mulakatholhu)', value : 'Meemu'},
    {label:'Faafu Atoll (Nilandhe Atholhu Uthuruburi)', value : 'Faafu'},
    {label:'Dhaalu Atoll (Nilandhe Atholhu Dhekunuburi)', value : 'Dhaalu'},
    {label:'Thaa Atoll (Kolhumadulu)', value : 'Thaa'},
    {label:'Laamu Atoll (Hadhunmathi)', value : 'Laamu'},
    {label:'Gaafu_Alif Atoll (Huvadhu Atholhu Uthuruburi)', value : 'Gaafu_Alif'},
    {label:'Gaafu_Dhaalu Atoll (Huvadhu Atholhu Dhekunuburi)', value : 'Gaafu_Dhaalu'},
    {label:'Gnaviyani Atoll (Fuvahmulaku)', value : 'Gnaviyani'},
    {label:'Seenu Atoll (Addu Atholhu)', value : 'Seenu'}],
    
    onChange : function(value){
    var selected_atoll =  (atolls.filter(ee.Filter.eq("name", value)));

    var start = selectStartYear.getValue();
    var end = selectEndYear.getValue();

    //var startdate = ee.Date(startyear);
    //var enddate = ee.Date(endyear);

    var dataset = ee.ImageCollection('COPERNICUS/S3/OLCI')
                  .filterDate(start, end);

    var image = dataset.select(['Oa11_radiance', 'Oa08_radiance'])
              .median()
              // Convert to radiance units.
              .multiply(ee.Image([0.00675523, 0.00876539])).clip(selected_atoll);


    var chl_a = image.normalizedDifference(['Oa11_radiance', 'Oa08_radiance']).rename('chl-a');

    var Mean = chl_a.reduce(ee.Reducer.median()).select(['median']);

    var palettes = require('users/gena/packages:palettes');
    var palette = palettes.misc.jet[7];

    Map.centerObject(selected_atoll, 10);

    Map.addLayer(Mean, {min: -0.20, max: 0, palette: palette}, 'tmax');
    
    panel.add(ui.Button('RESET', function () {
      Map.clear();
      //ui.root.clear()
      panel.clear()
      //ui.root.insert(0,panel);
      ui.root.widgets().get(1)
      //panel.clear(islandSelect);
      
panel.add(ui.Label({value: '--Atoll Chlorophyll Explorer--',
  style: {
    fontWeight: 'bold',
    fontFamily: 'sans',
    fontSize: '20px',
    margin: '0 0 4px 0',
    textAlign: 'Center',
    color: '#b31b1b',
    padding: '10px'
    }
}));

panel.add(ui.Label({value: 'Select the adminstrative Atoll from the drop down menu to get approximate Surface Chlorophyll across the atoll over time. The atoll boundaries are presented as approximate adminstrative boundaries and coverage is provided for nearly all of the atolls. Where data is not available, it is suggested to use estimates from the nearest atoll. Chlorophyll is derived from the  Sentinel-3 dataset from the ECMWF/Copernicus Climate Change Service, using the Non Descriptive Chlorophyl Index. To select a new atoll press the reset button.',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    fontFamily: 'sans',
    color: '#000000',
    //border : '1px solid black',
    padding: '10px'
    }
}));


panel.add(ui.Label({value: 'Select the start and end dates (YYYY-MM-DD) to plot Chlorophyll. To reduce processing time and minimize resource usage it is suggested to use a suitable temporal scale.',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    fontFamily: 'sans',
    color: '#000000',
    //border : '1px solid black',
    padding: '10px'
    }
}));


panel.add(startRange_subtext).add(nextRow);

      
      panel.widgets().insert(5, islandSelect);
      
    }));
    
}});

islandSelect.setPlaceholder('Select Administrative Atoll Boundary');
//print (islandSelect)

//////////////////////////////////////////////////////////////////////////////////////

//panel.insert(5,islandSelect);
panel.widgets().set(5, islandSelect);







