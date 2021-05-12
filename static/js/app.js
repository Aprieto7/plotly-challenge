//Code
function getMetaData(sample) {
  d3.json("../Data/samples.json").then((incomingData) => {
    var resultArray = incomingData.metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(result)
    var sampleMetadata = d3.select("#sample-metadata")
    sampleMetadata.html(" ");

    Object.entries(result).forEach(([key, value]) => {
      sampleMetadata.append("p").text(`${key}: ${value}`)
    });
  });
};

function buildCharts(sample) {
    d3.json("../Data/samples.json").then((incomingData) => {
  //Point to the sample portion of the data file(samples.json)
      var samples = incomingData.sample;

  //Create the result array based on the 'sample'(created in the init function)
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      console.log(result);

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

  var layout = {
    title: "Belly Button Diversity",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };


Plotly.newPlot("#bar", data, layout);

        // The bubble chart
        var trace1 = {
          x: incomingData.otu_ids,
          y: incomingData.sample[0].sample_values,
          mode: "markers",
          marker: {
              size: incomingData.samples[0].sample_values,
              color: incomingData.samples[0].otu_ids
          },
          text:  incomingData.samples[0].otu_labels

      };

      // set the layout for the bubble plot
      var layout_2 = {
          xaxis:{title: "OTU ID"},
          height: 600,
          width: 1000
      };

      // creating data variable 
      var data1 = [trace1];

  // create the bubble plot
  Plotly.newPlot("#bubble", data1, layout_2); 
  
  });
} 

// Function for optionChanged
function optionChanged (sample) {
  getMetaData(sample);
}

// create the function for the initial data rendering
function init() {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

  // read the data 
  d3.json("../Data/samples.json").then((incomingData)=> {
      console.log(incomingData)

      // get the id data to the dropdwown menu
      incomingData.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value", name);
      });

      // call the functions to display the data and the plots to the page
      //buildCharts(incomingData.names[0]);
      getMetaData(incomingData.name[0]);
  });
}

init();
  