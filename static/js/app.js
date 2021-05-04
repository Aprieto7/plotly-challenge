// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("data/samples.json").then((incomingData) => {
    function top10OTUs(biodiversity) {
      return (biodiversity.otu_ids) > 10;
    

      var ids = sampledata.samples[0].otu_ids;

      var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();

      var labels = sampledata.samples[0].otu_labels.slice(0,10);

    };
