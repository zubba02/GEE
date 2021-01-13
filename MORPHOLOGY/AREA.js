var islands = ee.FeatureCollection ('users/zubba1989/islands_mv');

var panel = ui.Panel({style: {width: '500px', position: 'bottom-right'}});
panel.add(ui.Label({value: 'Island Area Calculator.',
  style: {
    fontWeight: 'bold',
    fontFamily: 'times',
    fontSize: '25px',
    margin: '0 0 4px 0',
    textAlign: 'left',
    color: '#b31b1b',
    padding: '10px'
    }
}));

panel.add(ui.Label({value: 'Select your region in the form of Atoll.Island from the drop down menu to calculate the area. \nCurrently inhabited islands in the Maldive Islands chain which falls within the coverage of SENTINEL-2 satellites by the European Space Agency is included. (This includes all islands except for islands in the Nothern most geographical Atoll of Ihavandhippolhu, where coverage is partial.)',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    fontFamily: 'times',
    color: '#000000',
    //border : '1px solid black',
    padding: '10px'
    }
}));

//panel.add(ui.Label('Select your region of intrest to calculate the area.'));
//print(ui.Label('Here is a:\nnew line', {whiteSpace: 'pre'}));


//var islands = ee.FeatureCollection ('users/zubba1989/goidhoo_atoll');

var islandSelect = ui.Select({
  items : [
    
    {label:'S.Hithadhu,Maradhu,Feydhu,Gan', value : 'S.Hithadhu,Maradhu,Feydhu,Gan'},
    {label:'S.Meedhu,Hulhudhu', value : 'S.Meedhu,Hulhudhu'},
    {label:'Gn.Fuvahmulah', value : 'Fuvahmulah'},
    {label:'Ga.Villingilli', value : 'Ga.Villingilli'},
    //{label:'Ga.Kooddoo', value : 'Ga.Kooddoo'},
    {label:'Ga.Maamendhu', value : 'Ga.Maamendhu'},
    {label:'Ga.Nilandhu', value : 'Ga.Nilandhu'},
    {label:'Ga.Dhaandhu', value : 'Ga.Dhaandhu'},
    {label:'Ga.Kondey', value : 'Ga.Kondey'},
    {label:'Ga.Dhiyadhoo', value : 'Ga.Dhiyadhoo'},
    {label:'Ga.Gemanafushi', value : 'Ga.Gemanafushi'},
    {label:'GDh.Gahdhoo', value : 'GDh.Gahdhoo'},
    {label:'GDh.Vaadhoo', value : 'GDh.Vaadhoo'},
    {label:'Gdh.FaresMaathoda', value : 'Gdh.FaresMaathoda'},
    {label:'GDh.Fiyori', value : 'GDh.Fiyori'},
    {label:'GDh.Rathafandhoo', value : 'GDh.Rathafandhoo'},
    {label:'GDh.Nadella', value : 'GDh.Nadella'},
    {label:'Gdh.Hoadedhoo', value : 'Gdh.Hoadedhoo'},
    {label:'GDh.Madaveli', value : 'GDh.Madaveli'},
    {label:'GDh.Kaadedhoo', value : 'GDh.Kaadedhoo'},
    {label:'GDh.Thinadhoo', value : 'GDh.Thinadhoo'},
    {label:'GA.Kolamaafushi', value : 'GA.Kolamaafushi'},
    {label: 'L.Gan,Kahdhoo,Funadho', value : 'L.Gan,Kahdhoo,Funadho'},
    {label:'L.Hithadhoo', value : 'L.Hithadhoo'},
    {label:'L.Kunahandhoo', value : 'L.Kunahandhoo'},
    {label:'L.Maamendhoo', value : 'L.Maamendhoo'},
    {label:'L.Kalhaidhoo', value : 'L.Kalhaidhoo'},
    {label:'L.Mundoo', value : 'L.Mundoo'},
    {label:'L.Maabaidhoo', value : 'L.Maabaidhoo'},
    {label:'L.Isdhoo', value : 'L.Isdhoo'},
    {label:'L.Dhanbidhoo', value : 'L.Dhanbidhoo'},
    {label:'L.Maavah', value : 'L.Maavah'},
    {label:'Th.Omadhoo', value : 'Th.Omadhoo'},
    {label:'Th.Kinbidhoo', value : 'Th.Kinbidhoo'},
    {label:'Th.Veymandoo', value : 'Th.Veymandoo'},
    {label:'Th.Thimrafushi', value : 'Th.Thimrafushi'},
    {label:'Th.Gaadhiffushi', value : 'Th.Gaadhiffushi'},
    {label:'Th.Dhiyamigili', value : 'Th.Dhiyamigili'},
    {label:'Th.Madifushi', value : 'Th.Madifushi'},
    {label:'Th.Vilufushi', value : 'Th.Vilufushi'},
    {label:'Th.Buruni', value : 'Th.Buruni'},
    {label:'Th.Kandoodhoo', value : 'Th.Kandoodhoo'},
    {label:'Th.Vandhoo', value : 'Th.Vandhoo'},
    {label:'Th.Hirilandhoo', value : 'Th.Hirilandhoo'},
    {label:'Dh.Kudahuvadhoo', value : 'Dh.Kudahuvadhoo'},
    {label:'Dh.Maaemboodhoo', value : 'Dh.Maaemboodhoo'},
    {label:'Dh.Hulhudheli', value : 'Dh.Hulhudheli'},
    {label:'Dh.Meedhoo', value : 'Dh.Meedhoo'},
    {label:'Dh.Bandhidhoo', value : 'Dh.Bandhidhoo'},
    {label:'Dh.Rinbidhoo', value : 'Dh.Rinbidhoo'},
    {label:'F.Nilandhoo', value : 'F.Nilandhoo'},
    {label:'F.Dharanboodhoo', value : 'F.Dharanboodhoo'},
    {label:'F.Magoodhoo', value : 'F.Magoodhoo'},
    {label:'F.Bileydhoo', value : 'F.Bileydhoo'},
    {label:'F.Feeali', value : 'F.Feeali'},
    {label:'M.Kolhufushi', value : 'M.Kolhufushi'},
    {label:'M.Muli', value : 'M.Muli'},
    {label:'M.Naalaafushi', value : 'M.Naalaafushi'},
    {label:'M.Mulah', value : 'M.Mulah'},
    {label:'M.Veyvah', value : 'M.Veyvah'},
    {label:'M.Raimendhoo', value : 'M.Raimendhoo'},
    {label:'M.Dhiggaru', value : 'M.Dhiggaru'},
    {label:'M.Naalaafushi', value : 'M.Naalaafushi'},
    {label:'ADh.Fenfushi', value : 'ADh.Fenfushi'},
    {label:'ADh.Maamigili', value : 'ADh.Maamigili'},
    {label:'ADh.Dhigurah', value : 'ADh.Dhigurah'},
    {label:'ADh.Mahibadhoo', value : 'ADh.Mahibadhoo'},
    {label:'ADh.Kumburudhoo', value : 'ADh.Kumburudhoo'},
    {label:'ADh.Omadhoo', value : 'ADh.Omadhoo'},
    {label:'ADh.Hangnaameedhoo', value : 'ADh.Hangnaameedhoo'},
    {label:'Aa.Ulkulhas', value : 'Aa.Ulkulhas'},
    {label:'Aa.Mathiveri', value : 'Aa.Mathiveri'},
    {label:'Aa.Bodufulhadhoo', value : 'Aa.Bodufulhadhoo'},
    {label:'Aa.Feridhoo', value : 'Aa.Feridhoo'},
    {label:'Aa.Maalhos', value : 'Aa.Maalhos'},
    {label:'Aa.Himandhoo', value : 'Aa.Himandhoo'},
    {label:'ADh.Mandhoo', value : 'ADh.Mandhoo'},
    {label:'Aa.Rasdhoo', value : 'Aa.Rasdhoo'},
    {label:'Aa.Rasdhoo', value : 'Aa.Rasdhoo'},
    {label:'K.Guraidhoo', value : 'K.Guraidhoo'},
    {label:'K.Maafushi', value : 'K.Maafushi'},
    {label:'K.Gulhi', value : 'K.Gulhi'},
    {label:'K.Male', value : 'K.Male'},
    {label:'K.Hulhumale', value : 'K.Hulhumale'},
    {label:'K.Villingilli', value : 'K.Villingilli'},
    {label:'K.Gulhifalhi', value : 'K.Gulhifalhi'},
    {label:'K.Thulusdhoo', value : 'K.Thulusdhoo'},
    {label:'K.Himmafushi', value : 'K.Himmafushi'},
    {label:'K.Huraa', value : 'K.Huraa'},
    {label:'K.Thulusdhoo', value : 'K.Thulusdhoo'},
    {label:'K.Dhiffushi', value : 'K.Dhiffushi'},
    {label:'K.Gaafaru', value : 'K.Gaafaru'},
    {label:'K.Kaashidhoo', value : 'K.Kaashidhoo'},
    {label:'B.Goidhoo', value : 'B.Goidhoo'},
    {label:'B.Fhendhoo', value : 'B.Fhendhoo'},
    {label:'B.Fulhadhoo', value : 'B.Fulhadhoo'},
    {label:'B.Thulhaadhoo', value : 'B.Thulhaadhoo'},
    {label:'B.Hithaadhoo', value : 'B.Hithaadhoo'},
    {label:'B.Eydhafushi', value : 'B.Eydhafushi'},
    {label:'B.Maalhos', value : 'B.Maalhos'},
    {label:'B.Dharavandhoo', value : 'B.Dharavandhoo'},
    {label:'B.Dhonfanu', value : 'B.Dhonfanu'},
    {label:'B.Kihaadhoo', value : 'B.Kihaadhoo'},
    {label:'B.Kamadhoo', value : 'B.Kamadhoo'},
    {label:'B.Kudarikilu', value : 'B.Kudarikilu'},
    {label:'B.Kendhoo', value : 'B.Kendhoo'},
    {label:'R.Kinolhas', value : 'R.Kinolhas'},
    {label:'R.Fainu', value : 'R.Fainu'},
    {label:'R.Inguraidhoo', value : 'R.Inguraidhoo'},
    {label:'R.Meedhoo', value : 'R.Meedhoo'},
    {label:'R.Maduvvari', value : 'R.Maduvvari'},
    {label:'R.Innamaadhoo', value : 'R.Innamaadhoo'},
    {label:'R.Rasmaadhoo', value : 'R.Rasmaadhoo'},
    {label:'R.Maakurathu', value : 'R.Maakurathu'},
    {label:'R.Dhuvaafaru', value : 'R.Dhuvaafaru'},
    {label:'R.Ungoofaaru', value : 'R.Ungoofaaru'},
    {label:'R.Ifuru', value : 'R.Ifuru'},
    {label:'R.Hulhudhuffaaru', value : 'R.Hulhudhuffaaru'},
    {label:'R.Angolhitheemu', value : 'R.Angolhitheemu'},
    {label:'R.Rasgetheemu', value : 'R.Rasgetheemu'},
    {label:'R.Vaadhoo', value : 'R.Vaadhoo'},
    {label:'R.Alifushi', value : 'R.Alifushi'},
    {label:'R.Olhuvelifushi', value : 'R.Olhuvelifushi'},
    {label:'Lh.Kurendhoo', value : 'Lh.Kurendhoo'},
    {label:'Lh.Madivaru', value : 'Lh.Madivaru'},
    {label:'Lh.Naifaru', value : 'Lh.Naifaru'},
    {label:'Lh.Hinnavaru', value : 'Lh.Hinnavaru'},
    {label:'N.Velidhoo', value : 'N.Velidhoo'},
    {label:'N.Fohdhoo', value : 'N.Fohdhoo'},
    {label:'N.Holhudhoo', value : 'N.Holhudhoo'},
    {label:'N.Manadhoo', value : 'N.Manadhoo'},
    {label:'N.Magoodhoo', value : 'N.Magoodhoo'},
    {label:'N.Miladhoo', value : 'N.Miladhoo'},
    {label:'N.Lhohi', value : 'N.Lhohi'},
    {label:'N.Maafaru', value : 'N.Maafaru'},
    {label:'N.Landhoo', value : 'N.Landhoo'},
    {label:'N.Maalhendhoo', value : 'N.Maalhendhoo'},
    {label:'N.Kudafari', value : 'N.Kudafari'},
    {label:'N.Kendhikulhudhoo', value : 'N.Knedhikulhudhoo'},
    {label:'N.Henbadho', value : 'N.Henbadho'},
    {label:'Sh.Maaungoodhoo', value : 'Sh.Maaungoodhoo'},
    {label:'Sh.Funadhoo', value : 'Sh.Funadhoo'},
    {label:'Sh.Komandoo', value : 'Sh.Komandoo'},
    {label:'Sh.Lhaimagu', value : 'Sh.Lhaimagu'},
    {label:'Sh.Maroshi', value : 'Sh.Maroshi'},
    {label:'Sh.Narudhoo', value : 'Sh.Narudhoo'},
    {label:'Sh.Milandhoo', value : 'Sh.Milandhoo'},
    {label:'Sh.Feevah', value : 'Sh.Feevah'},
    {label:'Sh.Foakaidhoo', value : 'Sh.Foakaidhoo'},
    {label:'Sh.Bileifahi', value : 'Sh.Bileifahi'},
    {label:'Sh.Feydhoo', value : 'Sh.Feydhoo'},
    {label:'Sh.Noomaraa', value : 'Sh.Noomaraa'},
    {label:'Sh.Goihdoo', value : 'Sh.Goihdoo'},
    {label:'Sh.Kanditheemu', value : 'Sh.Kanditheemu'},
    {label:'Sh.Makunudhoo', value : 'Sh.Makunudhoo'},
    {label:'HDh.Vaikaradhoo', value : 'HDh.Vaikaradhoo'},
    {label:'HDh.Neykurendhoo', value : 'HDh.Neykurendhoo'},
    {label:'HDh.Kumundhoo', value : 'HDh.Kumundhoo'},
    {label:'HDh.Kulhuduffushi', value : 'HDh.Kulhuduffushi'},
    {label:'HDh.Nolhivaran', value : 'HDh.Nolhivaran'},
    {label:'HDh.Kurinbi', value : 'HDh.Kurinbi'},
    {label:'HDh.Nolhivaranfaru', value : 'HDh.Nolhivaranfaru'},
    {label:'HDh.Nellaidhoo', value : 'HDh.Nellaidhoo'},
    {label:'HDh.Naavaidhoo', value : 'HDh.Naavaidhoo'},
    {label:'HDh.Hirimaradhoo', value : 'HDh.Hirimaradhoo'},
    {label:'HDh.Hanimaadhoo', value : 'HDh.Hanimaadhoo'},
    {label:'Ha.Maarandhoo', value : 'Ha.Maarandhoo'},
    {label:'Ha.Thakandhoo', value : 'Ha.Thakandhoo'},
    {label:'Ha.Utheemu', value : 'Ha.Utheemu'},
    {label:'Ha.Muraidhoo', value : 'Ha.Muraidhoo'},
    {label:'Ha.Baarah', value : 'Ha.Baarah'},
    {label:'Ha.Dhidhoo', value : 'Ha.Dhidhoo'},
    {label:'Ha.Vashafaru', value : 'Ha.Vashafaru'},
    {label:'Ha.Kelaa', value : 'Ha.Kelaa'},
    {label:'Ha.Filladhoo', value : 'Ha.Filladhoo'}],
    //{label:'Ha.Ihavandhoo', value : 'Ha.Ihavandhoo'},
    //{label:'Ha.Hoarafushi', value : 'Ha.Hoarafushi'},
    //{label:'Ha.Thuraakunu', value : 'Ha.Thuraakunu'},
    //{label:'Ha.Uligan', value : 'Ha.Uligan'},
    //{label:'Ha.Mulhadhoo', value : 'Ha.Mulhadhoo'}],
    
    /*{label:'island_A', value : 'island_1'},
    {label: 'island_B', value : 'island_2'}],*/
    
  onChange : function(value){
    var selected_island =  (islands.filter(ee.Filter.eq("name", value)));
    Map.centerObject(selected_island);
    Map.clear();
    //Map.addLayer(selected_island, {color : 'FF0000'}, value);
    
    var S1 = ee.ImageCollection('COPERNICUS/S2').filterBounds(selected_island).filterDate('2013-01-01','2020-09-01');
    var filtered = S1.filterMetadata('CLOUD_COVERAGE_ASSESSMENT', 'less_than', 10)
    
    function maskS2clouds(image) {
      var qa = image.select('QA60');
      // Both flags should be set to zero, indicating clear conditions.
      var cloudBitMask = ee.Number(2).pow(10).int();
      var cirrusBitMask = ee.Number(2).pow(11).int();
      var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0));
      return image.updateMask(mask);
    }
    
    var calcNdwi = function(img) {
      var cloud_less = maskS2clouds(img)
      var ndwi = cloud_less.normalizedDifference(['B3','B8']).rename('NDWI')
    return img.addBands(ndwi)
    }
    
    S1 = filtered.map(calcNdwi).select('NDWI')
    
    var clasifyNDWI = function(img){
      var ndwi = img.select('NDWI')
      var land = ndwi.lt(0.1).rename('Land')
      land = land.updateMask(land)
    return img.addBands(land)
    }
    
    S1 = S1.map(clasifyNDWI)
    
    var ClassChart = ui.Chart.image.series({
      imageCollection: S1.select('Land'),
      region: selected_island,
      reducer: ee.Reducer.sum(),
      scale: 100,
    })
  .setOptions({
      title: 'Island Size over time',
      fontSize: 12.5,
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Island size in Hecatars'},
      lineWidth: 0.15,
      pointSize: 2.0,
      color: '00FF00'
    })
    .setChartType('ScatterChart');
  
  var selectisland = value;
  panel.add(ui.Label(selectisland));  
  
  panel.widgets().set(2,ClassChart);
  
  
  
  var label = ui.Label('To visualize land pixels used for calculation for a particular day, use the chart.');
  Map.add(label);
  
  ClassChart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
  
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data and clip water classification to roi 
    var classification = ee.Image(S1.filter(equalDate).first()).clip(selected_island).select('Land'); 
    var SARimage = ee.Image(S1.filter(equalDate).first());
    //Make map layer based on SAR image, reset the map layers, and add this new layer
    var S1Layer = ui.Map.Layer(SARimage, {
      bands: ['Land'],
      max: 0,
      min: -1
    });
    Map.layers().reset([S1Layer]);
    var visParams = {
      min: 0,
      max: 1,
      palette: ['#007afc','#00ff33']
    }
    //Add water classification on top of SAR image
    Map.addLayer(classification,visParams,'Land')
    
    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
  });
  
  panel.add(ui.Label({value: 'To visualize the land area calculated for a particular day use the clickable Island Size over time chart above, to rule out images with cloud interference. The date and time in GMT, of the SENTINEL-2 image is displayed on the Map for reference. To select another island please use the reset button below. (The chart can be expanded and downloaded in different formats for further processing).',
  style: {
    fontWeight: 'normal',
    fontFamily: 'times',
    fontSize: '15px',
    margin: '0 0 4px 0',
    textAlign: 'left',
    padding: '10px'
    }
}));
  
    panel.add(ui.Button('RESET', function () {
    Map.clear();
    panel.clear();
    
    panel.add(ui.Label({value: 'Island Area Calculator.',
  style: {
    fontWeight: 'bold',
    fontFamily: 'times',
    fontSize: '25px',
    margin: '0 0 4px 0',
    textAlign: 'left',
    color: '#b31b1b',
    padding: '10px'
    }
}));

panel.add(ui.Label({value: 'Select your region in the form of Atoll.Island from the drop down menu to calculate the area. \nCurrently islands in the Maldive Islands chain which falls within the coverage of SENTINEL-2 satellites by the European Space Agency is included.',
  style: {
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 0 4px 0',
    fontFamily: 'times',
    color: '#000000',
    //border : '1px solid black',
    padding: '10px'
    }
})); 
    panel.add(ui.Label('Please select the Island.'));
    panel.widgets().set(2, islandSelect);
    panel.add(ui.Label({value: 'Shuaib Rasheed. Contact \u2709 : zubba_1989@hotmail.com',
  style: {
    fontWeight: 'normal',
    fontFamily: 'times',
    fontSize: '12.5px',
    margin: '0 0 4px 0',
    textAlign: 'left',
    //border : '1px solid black',
    padding: '10px'
    }
}));
    }));
    }});
    
panel.widgets().set(2, islandSelect);
ui.root.add(panel);
panel.add(ui.Label({value: 'Shuaib Rasheed. Contact \u2709 : zubba_1989@hotmail.com',
  style: {
    fontWeight: 'normal',
    fontFamily: 'times',
    fontSize: '12.5px',
    margin: '0 0 4px 0',
    textAlign: 'left',
    padding: '10px'
    }
}));
