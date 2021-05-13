//Code
function getMetaData(sample) {
  d3.json("Data/samples.json").then((incomingData) => {
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
    d3.json("Data/samples.json").then((incomingData) => {
  //Point to the sample portion of the data file(samples.json)
      var samples = incomingData.samples;

  //Create the result array based on the 'sample'(created in the init function)
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      console.log(result);

  //assign the otu_ids, sample_values, and otu_labels to variables to use in plots
      var otu_ids = result.otu_ids.slice(0,10).reverse().map(d => "OTU ID " + d);
      var sampleValues = result.sample_values.slice(0,10).reverse();
      var otu_labels = result.otu_labels.slice(0,10).reverse();

  //Build Bar Chart
  var trace = {
    x: sampleValues,
    y: otu_ids,
    text: otu_labels,
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


Plotly.newPlot("bar", data, layout);

        // The bubble chart
        var trace1 = {
          x: result.otu_ids,
          y: result.sampleValues,
          mode: "markers",
          marker: {
              size: result.sampleValues,
              color: result.otu_ids
          },
          text: result.otu_labels

      };

      // set the layout for the bubble plot
      var layout_2 = {
          title: "Bacteria Cultures per Sample",
          xaxis:{title: "OTU ID"},
          height: 600,
          width: 1000
      };

      // creating data variable 
      var data1 = [trace1];

  // create the bubble plot
  Plotly.newPlot("bubble", data1, layout_2); 
  
  });
} 

// Function for optionChanged
function optionChanged (sample) {
  getMetaData(sample);
  buildCharts(sample);
}

// create the function for the initial data rendering
function init() {
  // select dropdown menu 
  var dropdown = d3.select("#selDataset");

  // read the data 
  d3.json("Data/samples.json").then((incomingData)=> {
      console.log(incomingData)

      // get the id data to the dropdwown menu
      incomingData.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value", name);
      });

      // call the functions to display the data and the plots to the page
      buildCharts(incomingData.names[0]);
      getMetaData(incomingData.names[0]);
  });
}

init();
  