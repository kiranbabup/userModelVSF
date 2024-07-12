<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Two Input Fields</title>
    <style>
        .darkgreen-value {
            background-color: #63BE7B;

        }

        .lightgreen-value {

            background-color: #A9D17E;
        }

        .yellow-value {

            background-color: #F0E684
        }

        .orange-value {

            background-color: #FFA572;
        }

        .vlow-value {

            background-color: #F8696B
        }

        .table-container {
            display: flex;

        }

        .table-container table {
            margin: 0 10px;
        }
    </style>
</head>

<body>
    <div class="table-container">
        <div id="demo"></div>
        <div id="demo1"></div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script>
        var str = "";
        var str1 = "";
        var sort = [];
        var sort1 = [];

        var sort11 = [];
        var sort12 = [];
        //1jdXc-ygaR6xoiaY5LL2fMiOk5ZI6T-V60D1RRedH80I

        // https://sheets.googleapis.com/v4/spreadsheets/1jdXc-ygaR6xoiaY5LL2fMiOk5ZI6T-V60D1RRedH80I/values/vsdata2?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k
        fetch('https://sheets.googleapis.com/v4/spreadsheets/1I3ctHbNOlmy7xseACHRbiOyP5W3rMOKYPgnOxQpGbm4/values/heatccsv?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k')
            .then(response => response.json())
            .then(response => {
                var values = response.values;
                console.log(values[0].length)

                var keys = values[0].slice(1, 41).map(function (item) {
                    return item.toUpperCase();
                });

                var keyval = values[1].slice(1, 41).map(function (item) {
                    return item;
                });


                var keys1 = values[0].slice(41, 89).map(function (item) {
                    return item.toUpperCase();
                });

                var keyval1 = values[1].slice(41, 89).map(function (item) {
                    return item;
                });
                console.log(keys)
                console.log(keyval1)

                str += "<table border='1'>";
                str += "<td  onclick='name()'><b>NAME</b></td>";
                str += "<td onclick='myfun()'><b>VALUES</b></td>";
                for (i = 0; i < keys.length; i++) {
                    str += "<tr>";
                    str += "<td>" + keys[i].split("-")[1].split("_")[0].replace("NIFTY", "NFT") + "</td>";
                    var cellValue = parseFloat(keyval[i]);
                    var cellValueFormatted = cellValue.toFixed(2);
                    sort1.push(keys[i].split("-")[1].split("_")[0].replace("NIFTY", "NFT") + ',,' + cellValueFormatted);
                    sort.push(cellValueFormatted);
                    if (cellValue >= 0 && cellValue <= 0.2) {

                        str += "<td class='darkgreen-value'>" + cellValueFormatted + "</td>";
                    }
                    else if (cellValue > 0.2 && cellValue <= 0.4) {

                        str += "<td class='lightgreen-value'>" + cellValueFormatted + "</td>";
                    }
                    else if (cellValue > 0.4 && cellValue <= 0.6) {

                        str += "<td class='yellow-value'>" + cellValueFormatted + "</td>";
                    }
                    else if (cellValue > 0.6 && cellValue <= 0.8) {

                        str += "<td class='orange-value'>" + cellValueFormatted + "</td>";
                    }


                    else {

                        str += "<td class='vlow-value'>" + cellValueFormatted + "</td>";
                    }
                    str += "</tr>";
                }
                str += "</table>";
                document.getElementById("demo").innerHTML = str;

                str1 += "<table border='1'>";
                str1 += "<td onclick='name1()'><b>NAME</b></td>";
                str1 += "<td onclick='myfun1()'><b>VALUES</b></td>";
                for (i = 0; i < keys1.length; i++) {
                    str1 += "<tr>";
                    str1 += "<td>" + keys1[i].split("-")[1].split("_")[0].replace("NIFTY", "NFT") + "</td>";
                    var cellValue = parseFloat(keyval1[i]);
                    var cellValueFormatted = cellValue.toFixed(2);
                    sort11.push(keys1[i].split("-")[1].split("_")[0].replace("NIFTY", "NFT") + ',,' + cellValueFormatted);
                    sort12.push(cellValueFormatted);
                    if (cellValue >= 0 && cellValue <= 0.2) {

                        str1 += "<td class='darkgreen-value'>" + cellValueFormatted + "</td>";
                    }
                    else if (cellValue > 0.2 && cellValue <= 0.4) {

                        str1 += "<td class='lightgreen-value'>" + cellValueFormatted + "</td>";
                    }
                    else if (cellValue > 0.4 && cellValue <= 0.6) {

                        str1 += "<td class='yellow-value'>" + cellValueFormatted + "</td>";
                    }
                    else if (cellValue > 0.6 && cellValue <= 0.8) {

                        str1 += "<td class='orange-value'>" + cellValueFormatted + "</td>";
                    }


                    else {

                        str1 += "<td class='vlow-value'>" + cellValueFormatted + "</td>";
                    }
                    str1 += "</tr>";
                }
                str1 += "</table>";
                document.getElementById("demo1").innerHTML = str1;
            })


        function myfun() {
            let ss = ['m', 'n', 'b', 'l', 'a'];
            ss.sort();
            console.log(ss);

            let str = '';
            console.log(sort)
            sort.sort((a, b) => a - b);
            console.log(sort)
            let set = new Set(sort);
            console.log(set);
            let myArray = Array.from(set);

            console.log(sort1)
            console.log(sort1[1].split(',,')[0]);
            str = str + '<table border=1>';
            str = str + '<tr>';
            str = str + '<td onclick="name()"><b>NAME</b></td>';
            str = str + '<td><b>VALUES</b></td>';
            // str = str + '<td><b>Add</b></td>';
            str = str + '</tr>';
            for (i = 0; i < myArray.length; i++) {
                for (j = 0; j < sort1.length; j++) {
                    if (myArray[i] == sort1[j].split(',,')[1]) {
                        str = str + '<tr>';
                        str = str + '<td onclick="myfunn(\'' + myArray[i] + ",," + sort1[j].split(',,')[0] + '\')">' + sort1[j].split(',,')[0] + '</td>';

                        if (myArray[i] >= 0 && myArray[i] <= 0.2) {
                            str = str + '<td class="darkgreen-value">' + myArray[i] + '</td>';
                        }
                        else if (myArray[i] > 0.2 && myArray[i] <= 0.4) {
                            str = str + '<td class="lightgreen-value">' + myArray[i] + '</td>';

                        }
                        else if (myArray[i] > 0.4 && myArray[i] <= 0.6) {
                            str = str + '<td class="yellow-value">' + myArray[i] + '</td>';

                        }
                        else if (myArray[i] > 0.6 && myArray[i] <= 0.8) {
                            str = str + '<td class="orange-value">' + myArray[i] + '</td>';

                        }


                        else {
                            str = str + '<td class="vlow-value">' + myArray[i] + '</td>';
                        }


                        // str = str + '<td>' + myArray[i] + '</td>';
                        //str = str + '<td><center><button onclick="myfunn1(\'' + myArray[i] + ",," + sort1[j].split(',,')[0] + '\')">+</button></center></td>';
                        str = str + '</tr>';
                    }
                }
            }
            str = str + '</table>';
            document.getElementById('demo').innerHTML = str;
            // '<td onclick="myfun(\'' + filteredData[j] + '\')">'
        }

        function myfun1() {
            // console.log(values[0][4])
            let str = '';
            console.log(sort12)
            sort12.sort((a, b) => a - b);
            console.log(sort12)
            let set = new Set(sort12);
            console.log(set);
            let myArray = Array.from(set);

            console.log(sort11)
            console.log(sort11[1].split(',,')[0]);
            str = str + '<table border=1>';
            str = str + '<tr>';
            str = str + '<td  onclick="name1()"><b>NAME</b></td>';
            str = str + '<td><b>VALUES</b></td>';
            // str = str + '<td><b>Add</b></td>';
            str = str + '</tr>';
            for (i = 0; i < myArray.length; i++) {
                for (j = 0; j < sort11.length; j++) {
                    if (myArray[i] == sort11[j].split(',,')[1]) {
                        str = str + '<tr>';
                        str = str + '<td onclick="myfunn(\'' + myArray[i] + ",," + sort12[j].split(',,')[0] + '\')">' + sort11[j].split(',,')[0] + '</td>';

                        if (myArray[i] >= 0 && myArray[i] <= 0.2) {
                            str = str + '<td class="darkgreen-value">' + myArray[i] + '</td>';
                        }
                        else if (myArray[i] > 0.2 && myArray[i] <= 0.4) {
                            str = str + '<td class="lightgreen-value">' + myArray[i] + '</td>';

                        }
                        else if (myArray[i] > 0.4 && myArray[i] <= 0.6) {
                            str = str + '<td class="yellow-value">' + myArray[i] + '</td>';

                        }
                        else if (myArray[i] > 0.6 && myArray[i] <= 0.8) {
                            str = str + '<td class="orange-value">' + myArray[i] + '</td>';

                        }


                        else {
                            str = str + '<td class="vlow-value">' + myArray[i] + '</td>';
                        }


                        // str = str + '<td>' + myArray[i] + '</td>';
                        // str = str + '<td><center><button onclick="myfunn1(\'' + myArray[i] + ",," + sort1[j].split(',,')[0] + '\')">+</button></center></td>';
                        str = str + '</tr>';
                    }
                }
            }
            str = str + '</table>';
            document.getElementById('demo1').innerHTML = str;
            // '<td onclick="myfun(\'' + filteredData[j] + '\')">'
        }

        function name() {
            // document.getElementById('demo').innerHTML = "";
            sort1.sort();
            console.log(sort1)
            console.log(sort1[1].split(',,')[0]);
            let str="";
            str = str + '<table border=1>';
            str = str + '<tr>';
            str = str + '<td><b>NAME</b></td>';
            str = str + '<td onclick="myfun()"><b>VALUES</b></td>';
            // str = str + '<td><b>Add</b></td>';
            str = str + '</tr>';
            for (i = 0; i < sort1.length; i++) {
                // for (j = 0; j < sort1.length; j++) {
                    // if (myArray[i] == sort1[j].split(',,')[1]) {
                        str = str + '<tr>';
                        str = str + '<td >' + sort1[i].split(',,')[0] + '</td>';

                        if (sort1[i].split(',,')[1] >= 0 && sort1[i].split(',,')[1] <= 0.2) {
                            str = str + '<td class="darkgreen-value">' +sort1[i].split(',,')[1] + '</td>';
                        }
                        else if (sort1[i].split(',,')[1] > 0.2 && sort1[i].split(',,')[1] <= 0.4) {
                            str = str + '<td class="lightgreen-value">' + sort1[i].split(',,')[1] + '</td>';

                        }
                        else if (sort1[i].split(',,')[1] > 0.4 && sort1[i].split(',,')[1] <= 0.6) {
                            str = str + '<td class="yellow-value">' + sort1[i].split(',,')[1] + '</td>';

                        }
                        else if (sort1[i].split(',,')[1] > 0.6 && sort1[i].split(',,')[1] <= 0.8) {
                            str = str + '<td class="orange-value">' + sort1[i].split(',,')[1] + '</td>';

                        }


                        else {
                            str = str + '<td class="vlow-value">' + sort1[i].split(',,')[1] + '</td>';
                        }


                        // str = str + '<td>' + myArray[i] + '</td>';
                        //str = str + '<td><center><button onclick="myfunn1(\'' + myArray[i] + ",," + sort1[j].split(',,')[0] + '\')">+</button></center></td>';
                        str = str + '</tr>';
                    // }
                // }
            }
            str = str + '</table>';
            document.getElementById('demo').innerHTML = str;
        }

        function name1() {
            // document.getElementById('demo').innerHTML = "";
            sort11.sort();
            console.log(sort11)
            console.log(sort11[1].split(',,')[0]);
            let str="";
            str = str + '<table border=1>';
            str = str + '<tr>';
            str = str + '<td><b>NAME</b></td>';
            str = str + '<td onclick="myfun1()"><b>VALUES</b></td>';
            // str = str + '<td><b>Add</b></td>';
            str = str + '</tr>';
            for (i = 0; i < sort11.length; i++) {
                // for (j = 0; j < sort1.length; j++) {
                    // if (myArray[i] == sort1[j].split(',,')[1]) {
                        str = str + '<tr>';
                        str = str + '<td >' + sort11[i].split(',,')[0] + '</td>';

                        if (sort11[i].split(',,')[1] >= 0 && sort11[i].split(',,')[1] <= 0.2) {
                            str = str + '<td class="darkgreen-value">' +sort11[i].split(',,')[1] + '</td>';
                        }
                        else if (sort11[i].split(',,')[1] > 0.2 && sort11[i].split(',,')[1] <= 0.4) {
                            str = str + '<td class="lightgreen-value">' + sort11[i].split(',,')[1] + '</td>';

                        }
                        else if (sort11[i].split(',,')[1] > 0.4 && sort11[i].split(',,')[1] <= 0.6) {
                            str = str + '<td class="yellow-value">' + sort11[i].split(',,')[1] + '</td>';

                        }
                        else if (sort11[i].split(',,')[1] > 0.6 && sort11[i].split(',,')[1] <= 0.8) {
                            str = str + '<td class="orange-value">' + sort11[i].split(',,')[1] + '</td>';

                        }


                        else {
                            str = str + '<td class="vlow-value">' + sort11[i].split(',,')[1] + '</td>';
                        }


                        // str = str + '<td>' + myArray[i] + '</td>';
                        //str = str + '<td><center><button onclick="myfunn1(\'' + myArray[i] + ",," + sort1[j].split(',,')[0] + '\')">+</button></center></td>';
                        str = str + '</tr>';
                    // }
                // }
            }
            str = str + '</table>';
            document.getElementById('demo1').innerHTML = str;
        }

    </script>

</html>