function compute_stat(data, columns) {
    var stats = [];

    var data_by_cluster = d3.nest()
        .key(function (d) {
            return d.cluster;
        })
        .entries(data);

    stats.num_cluster = data_by_cluster.length;

    data_by_cluster.forEach(function(d){
        var cluster = [];
        cluster.id = d.key;
        cluster.num = d.values.length;

        columns.forEach(function(col){
            var array = [];
            d.values.forEach(function(row){
                array.push(row[col]);
            });

            cluster[col+"_stats"] = [];
            cluster[col+"_stats"].min = d3.min(array, function(d){return d});
            cluster[col+"_stats"].max = d3.max(array, function(d){return d});
            cluster[col+"_stats"].mean = mean(array);
            cluster[col+"_stats"].variance = variance(array);
        });

        stats.push(cluster);
    });

    return stats;
}

function mean(array) {
    return array.reduce((partial_sum, a) => partial_sum + a) / array.length;
}

function variance(array) {
    var m = mean(array);
    return mean(array.map(function (num) {
        return Math.pow(num - m, 2);
    }));
}