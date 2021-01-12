//Geometry Polygon




//Image Collection

var S1 = ee.ImageCollection('COPERNICUS/S2').filterBounds(selected_island).filterDate('2016-01-01','2020-03-28').filterMetadata('CLOUD_COVERAGE_ASSESSMENT', 'less_than', 10);

//NDWI For Land Area.
var calcNdwi = function(img) {
      var ndwi = img.normalizedDifference(['B3','B8']).rename('NDWI')
    return img.addBands(ndwi)
    }

S1 = S1.map(calcNdwi)

var clasifyNDWI = function(img){
      var ndwi = img.select('NDWI')
      var land = ndwi.lt(0.1).rename('Land')
      land = land.updateMask(land)
    return img.addBands(land)
    }

S1 = S1.map(clasifyNDWI)

//visualize
var classification = S1.first().clip(selected_island).select('Land'); 

var visParams = {
      min: -1,
      max: 1,
      palette: ['#007afc','#00ff33']
    }

Map.addLayer(classification,visParams,'Land')


//NDVI for Vegetation

var calcNDVI = function(img) {
      var ndvi = img.normalizedDifference(['B8','B4']).rename('NDVI')
    return img.addBands(ndvi)
    }

S1 = S1.map(calcNDVI)


var clasifyNDVI = function(img){
      var ndvi = img.select('NDVI');
      //var veg = ndvi.gt(0.1).and(ndvi.lt(0.5)).rename('Veg')
      var veg = ndvi.lt(0.9).and(ndvi.gt(0.45)).rename('Veg')
      veg = veg.updateMask(veg)
    return img.addBands(veg)
    }

S1 = S1.map(clasifyNDVI)

//visualize

var classification = S1.first().clip(selected_island).select('Veg'); 

var visParams = {
      min: -1,
      max: 1,
      palette: ['#007afc','#00ff33']
    }

Map.addLayer(classification,visParams,'Veg')



///Create Chart

var vegIndices = S1.select(['Land', 'Veg']);


// Define the chart and print it to the console.
var chart =
    ui.Chart.image
        .series({
          imageCollection: vegIndices,
          region: selected_island,
          reducer: ee.Reducer.sum(),
          scale: 100,
          xProperty: 'system:time_start'
        })
        .setSeriesNames(['Land', 'Veg'])
        .setOptions({
          title: 'Vegetation and Total Area over Time',
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Area',
            titleTextStyle: {italic: false, bold: true},
            viewWindow:{
          max:250,
          min:0}
          },
          lineWidth: 0.5,
          colors: ['e37d05', '1d6b99'],
          pointSize: 2.0,
          curveType: 'function'
        });
        
print(chart);

//////////////////////

//var lossImage = S1.select(['Veg']);

var classification = S1.first().clip(selected_island).select('Veg'); 
var classification2 = S1.first().clip(selected_island).select('Land'); 

var stats = classification.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: selected_island,
  scale: 100
});

var st1 = ee.Number(stats.get('Veg'));
print (st1)


var stats2 = classification2.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: selected_island,
  scale: 100
});

var st2 = ee.Number(stats2.get('Land'));
print (st2)


var s3 = ee.Number(st1).divide(st2).multiply(100)
print (s3)


