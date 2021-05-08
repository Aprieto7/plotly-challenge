//Variables
var idSelect = d3.select("#selDataset"); // goes into init() function 
//Code
function getMeteData(sample) {
  d3.json("data/samples.json").then((incomingData) => {
    var metaData = incomingData.metaData;
    data.names.forEach((name => {
        var option = idSelect.append("option");
        option.text(name);
    }));
    var sampleMetadata = d3.select("#sample-metadata");

    var getMeteData = idSelect.property("value")

    plotCharts(getMetaData);
  });
};

function charts(sample); 
  d3.json("data/samples.json").then((incomingData) => {
  var samples = incomingData.samples;

  //var barChart = d3.select("#bar");
  //var bubbleChart = d3.select("#bubble");

  var resultArray = samples.filter(samples => samples.id == sample);
  var result = resultArray[0];
  
  var otuID = result.otuID;
  var otuLabels = result.otu.otuLabels; 
  