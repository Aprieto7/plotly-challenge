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

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
//Point to the sample portion of the data file(samples.json)
    var samples = data.samples;

//Create the result array based on the 'sample'(created in the init function)
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    
//assign the otu_ids, sample_values, and otu_labels to variables to use in plots
    var otu_ids = result.otu_ids;
  