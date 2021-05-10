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
    var sampleValues = result.sampleValues;
    var otu_labels = result.otu_labels.slice(0,10);
    reversedData = otu_labels.reverse();

//Build Bar Chart
var trace = {
  x: sampleValues,
  y: otu_ids,
  text: reversedData,
  marker: {
  color: 'blue'},
  type:"bar",
  orientation: "h",
};
// create data variable
var data = [trace];

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

}

// create the function for the initial data rendering
function init() {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

  // read the data 
  d3.json("samples.json").then((data)=> {
      console.log(data)

      // get the id data to the dropdwown menu
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      // call the functions to display the data and the plots to the page
      getPlots(data.names[0]);
      getDemoInfo(data.names[0]);
  });
}

init();
  