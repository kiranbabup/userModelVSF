<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File</title>

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
    </style>
</head>

<body>
    <center>
        <h2>Search Your Stock<h2>
                <h4>Right Time, Right Price, Right Stock, Right Proportion</h4>
                <p id="table1"></p>
                <p id="reset"></p>
                <div style="display: flex;  justify-content: space-around;">
                    <p id="columns"></p>
                    <!-- <p id="value" onclick="myfun()"></p> -->
                    <p id="table"></p>
                    <div>
                        <p id="text" style="margin: 0; padding:1px;"></p>
                        <p id="image" style="margin: 0; "></p>
                    </div>

                    <!-- <p id="dropdown"></p> -->

                    <!-- <p id="image"></p> -->
                </div>

    </center>
    <script>

        var values = [];
        var sort = [];
        var sort1 = [];
        var myArray = [];
        const keyValuePairs = {};

        // fetch('https://sheets.googleapis.com/v4/spreadsheets/1AMJIekwmTduIjNvExBDT3MjuV8gtOUFL-cofVR9gF5Y/values/totalmarketcap?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k')
        fetch('https://sheets.googleapis.com/v4/spreadsheets/18IDm-Ut2i3zXsLSxLU5h-Ox9Xm0Bxi1kK9qVrPLR2dA/values/Latest_values?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k')
            .then(response => response.json())
            .then(response => {
                let drop1 = ''

                values = response.values.slice(1);
                console.log(values)
                console.log(values[0][3])

                if (values[0][3].includes("Mining ")) {
                    console.log("yes")
                }
                let industrys = new Set();

                for (i = 0; i < values.length; i++) {
                    if (values[i][3] != "#N/A") {
                        industrys.add(values[i][3]);
                    }

                }
                // console.log(industrys);
                myArray = Array.from(industrys);
                console.log("Array from set:", myArray);
                console.log("Array from set:", myArray.sort());

                for (let i = 0; i < myArray.length; i++) {
                    for (let j = 0; j < values.length; j++) {
                        if (myArray[i] === values[j][3]) {
                            const key = myArray[i];
                            const value = values[j][4];

                            if (keyValuePairs.hasOwnProperty(key)) {
                                keyValuePairs[key].push(value);
                            } else {
                                keyValuePairs[key] = [value];
                            }
                        }
                    }
                }
                console.log(keyValuePairs);

                const keyToCount = 'Banks - Private Sector';
                const valuesArray = keyValuePairs[keyToCount];
                console.log(keyValuePairs['Banks - Private Sector'])
                let count = 0;
                let counted = 0;
                valuesArray.forEach(value => {
                    if (value < 0.8) {
                        count++;
                    }
                    else {
                        counted++
                    }
                });
                // console.log(`Number of values less than 0.8: ${count}`);
                // console.log(`Number of values greater than 0.8: ${counted}`);

                let str1 = '';
                str1 = str1 + '<table border=1>';
                str1 = str1 + '<tr>';
                str1 = str1 + '<th>Stocks</th>';
                str1 = str1 + '<th>Values</th>';
                str1 = str1 + '</tr>';
                for (i = 0; i < myArray.length; i++) {
                    let undervalue = 0;
                    let balanced = 0;
                    let overvalue = 0;
                    str1 = str1 + '<tr>';
                    str1 = str1 + '<td  onclick="myfun1(' + i + ')">' + myArray[i] + '</td>';
                    keyValuePairs[myArray[i]].forEach(value => {
                        if (value > 1.3 && value <= 10) {
                            undervalue++;
                        }
                        else if (value > 0.8 && value <= 1.3) {
                            balanced++;
                        }
                        else {
                            overvalue++
                        }
                    });
                    console.log(`Number of values less than 0.8: ${undervalue}`);
                    console.log(`Number of values balanced 0.8: ${balanced}`);
                    console.log(`Number of values greater than 0.8: ${overvalue}`);
                    if (undervalue >= balanced && undervalue > overvalue) {
                        str1 = str1 + '<td class="darkgreen-value">Undervalued</td>'
                    }
                    else if (balanced > undervalue && balanced > overvalue) {
                        str1 = str1 + '<td class="yellow-value">Balanced</td>'
                    }
                    else {
                        str1 = str1 + '<td class="vlow-value">Overvalue</td>'
                    }



                    str1 = str1 + '</tr>';
                }
                str1 = str1 + '</table>';
                document.getElementById('columns').innerHTML = str1



            })





        function myfun1(index) {
            console.log(myArray)
            window.scrollTo({ top: 0, behavior: 'smooth' });

            let button = '';
            button = button + '<button>Sort</button>';

            sort = [];
            sort1 = [];
            let str = '';
            console.log(myArray[index]);
            str = str + '<table border=1>';
            str = str + '<tr>';
            str = str + '<td><b>NAME</b></td>';
            str = str + '<td onclick="myfun()"><b>VALUES</b></td>';
            str = str + '<td><b>Quality</b></td>';
            str = str + '<td><b>Growth</b></td>';
            str = str + '<td><b>Add</b></td>';
            str = str + '</tr>';
            for (i = 0; i < values.length; i++) {
                if (values[i][3].includes(myArray[index])) {
                    str = str + '<tr>';
                    str = str + '<td onclick="myfunn(\'' + values[i][4] + ",," + values[i][0] + '\')">' + values[i][0] + '</td>';

                    if (values[i][4] > 2.5 && values[i][4] <= 10) {
                        str = str + '<td class="darkgreen-value">' + values[i][4] + '</td>';

                    }

                    else if (values[i][4] > 1.3 && values[i][4] <= 2.5) {
                        str = str + '<td class="lightgreen-value">' + values[i][4] + '</td>';


                    }
                    else if (values[i][4] > 0.8 && values[i][4] <= 1.3) {
                        str = str + '<td class="yellow-value">' + values[i][4] + '</td>';


                    }
                    else if (values[i][4] > 0.4 && values[i][4] <= 0.8) {
                        str = str + '<td class="orange-value">' + values[i][4] + '</td>';


                    }
                    else {
                        str = str + '<td class="vlow-value">' + values[i][4] + '</td>';

                    }

                    if (values[i][5] > 80 && values[i][5] <= 100) {
                        str = str + '<td class="darkgreen-value">' + values[i][5] + '</td>';

                    }



                    else if (values[i][5] > 60 && values[i][5] <= 80) {

                        str = str + '<td class="lightgreen-value">' + values[i][5] + '</td>';

                    }
                    else if (values[i][5] > 40 && values[i][5] <= 60) {

                        str = str + '<td class="yellow-value">' + values[i][5] + '</td>';

                    }
                    else if (values[i][5] > 20 && values[i][5] <= 40) {

                        str = str + '<td class="orange-value">' + values[i][5] + '</td>';


                    }
                    else {

                        str = str + '<td class="vlow-value">' + values[i][5] + '</td>';

                    }



                    if (values[i][6] > 80 && values[i][6] <= 100) {
                        str = str + '<td class="darkgreen-value">' + values[i][6] + '</td>';

                    }



                    else if (values[i][6] > 60 && values[i][6] <= 80) {
                        str = str + '<td class="lightgreen-value">' + values[i][6] + '</td>';

                    }
                    else if (values[i][6] > 40 && values[i][6] <= 60) {

                        str = str + '<td class="yellow-value">' + values[i][6] + '</td>';

                    }
                    else if (values[i][6] > 20 && values[i][6] <= 40) {

                        str = str + '<td class="orange-value">' + values[i][6] + '</td>';

                    }
                    else {

                        str = str + '<td class="vlow-value">' + values[i][6] + '</td>';
                    }


                    str = str + '<td><center><button onclick="myfunn1(\'' + values[i][4] + ",," + values[i][0] + '\')">+</button></center></td>';
                    str = str + '</tr>';
                    sort.push(values[i][4]);
                    sort1.push(values[i][0] + ',,' + values[i][4] + ',,' + values[i][5] + ',,' + values[i][6])
                }
            }
            str = str + '</table>';
            document.getElementById('table').innerHTML = str;
            console.log(sort);
        }

        var mySet = new Set();

        function myfunn1(index) {
            console.log(index);

            if (index.split(',,')[0] <= 0 || index.split(',,')[0] == null || index.split(',,')[0] == 'undefined') {
                console.log(index.split(',,')[0] + "lessvalue");
            }
            else {
                let arr5 = 0;
                let arrr1 = 0;
                mySet.add(index.split(',,')[0] + "," + index.split(',,')[1])


                let arrr = Array.from(mySet);
                console.log(arrr + 'arrr')
                // console.log(arrr[0].split(',')[1] + "arrr");
                for (j = 0; j < arrr.length; j++) {
                    arrr1 = arrr1 + (+ arrr[j].split(',')[0])
                }
                console.log(arrr)
                console.log(arrr1)
                let button = "<button onclick='reseting()'>reset</button>"
                let str1 = "";
                str1 = str1 + "<table id='myTable' border=1>";
                str1 = str1 + "<tr>";
                str1 = str1 + "<td><b> # </b></td>";
                str1 = str1 + "<td><b>Stock</b></td>";
                str1 = str1 + "<td onclick='sorting()'><b> % </b></td>";
                str1 = str1 + "<td><b>Del</b></td>";
                str1 = str1 + "</tr>";
                for (i = 0; i < arrr.length; i++) {
                    str1 = str1 + "<tr id=" + i + ">";
                    str1 = str1 + "<td>" + [i + 1] + "</td>";
                    str1 = str1 + "<td>" + arrr[i].split(',')[1] + "</td>";
                    if (arrr[i].split(',')[0]) {
                        console.log(arrr[i].split(',')[0])
                        arr5 = arrr[i].split(',')[0]
                        console.log(arr5)
                        str1 = str1 + "<td>" + ((arr5 / arrr1) * 100).toFixed(1) + "</td>";
                    }
                    str1 = str1 + "<td><button onclick='deleteRow(" + parseInt(i) + ", \"" + arrr[i] + "\")'>-</button></td>";
                    str1 = str1 + "</tr>";
                }
                str1 = str1 + "</table>";

                // document.getElementById("reset").innerHTML = button
                document.getElementById("table1").innerHTML = str1;
            }




        }

        function deleteRow(index, index1) {

            document.getElementById(index).remove();
            let arr5 = 0;
            let arrr1 = 0;

            mySet.delete(index1);
            console.log(mySet)
            // console.log(arrr)

            let arrr = Array.from(mySet);
            console.log(arrr + 'arrr')
            // console.log(arrr[0].split(',')[1] + "arrr");
            for (j = 0; j < arrr.length; j++) {
                arrr1 = arrr1 + (+ arrr[j].split(',')[0])
            }
            console.log(arrr)
            console.log(arrr1)
            let button = "<button onclick='reseting()'>reset</button>"
            let str1 = "";
            str1 = str1 + "<table id='myTable' border=1>";
            str1 = str1 + "<tr>";
            str1 = str1 + "<td><b> # </b></td>";
            str1 = str1 + "<td><b>Stock</b></td>";
            str1 = str1 + "<td onclick='sorting()'><b> % </b></td>";
            str1 = str1 + "<td><b>Del</b></td>";
            str1 = str1 + "</tr>";
            for (i = 0; i < arrr.length; i++) {
                str1 = str1 + "<tr id=" + i + ">";
                str1 = str1 + "<td>" + [i + 1] + "</td>";
                str1 = str1 + "<td>" + arrr[i].split(',')[1] + "</td>";
                if (arrr[i].split(',')[0]) {
                    console.log(arrr[i].split(',')[0])
                    arr5 = arrr[i].split(',')[0]
                    console.log(arr5)
                    str1 = str1 + "<td>" + ((arr5 / arrr1) * 100).toFixed(1) + "</td>";
                }
                str1 = str1 + "<td><button onclick='deleteRow(" + parseInt(i) + ", \"" + arrr[i] + "\")'>-</button></td>";
                str1 = str1 + "</tr>";
            }
            str1 = str1 + "</table>";

            // document.getElementById("reset").innerHTML = button
            document.getElementById("table1").innerHTML = str1;


            if (mySet.size == 0) {
                document.getElementById("table1").innerHTML = "";
            }

        }

        // function reseting() {
        //     document.getElementById("table1").innerHTML = "";
        //     document.getElementById("reset").innerHTML = "";
        //     mySet = new Set();

        // }

        function myfun() {

            // console.log(values[0][4])
            let str = '';
            console.log(sort)
            sort.sort((a, b) => a - b);
            console.log(sort)
            let set = new Set(sort);
            console.log(set);
            let myArray = Array.from(set);
            console.log(myArray);
            console.log(sort1)
            console.log(sort1[0].split(',,')[2]);
            str = str + '<table border=1>';
            str = str + '<tr>';
            str = str + '<td><b>NAME</b></td>';
            str = str + '<td><b>VALUES</b></td>';
            str = str + '<td><b>Quality</b></td>';
            str = str + '<td><b>Growth</b></td>';
            str = str + '<td><b>Add</b></td>';
            str = str + '</tr>';
            for (i = 0; i < myArray.length; i++) {
                for (j = 0; j < sort1.length; j++) {
                    if (myArray[i] == sort1[j].split(',,')[1]) {
                        str = str + '<tr>';
                        str = str + '<td onclick="myfunn(\'' + myArray[i] + ",," + sort1[j].split(',,')[0] + '\')">' + sort1[j].split(',,')[0] + '</td>';

                        // if (myArray[i] >= 0 && myArray[i] <= 0.4) {
                        //     str = str + '<td class="darkgreen-value">' + myArray[i] + '</td>';
                        // }
                        // else if (myArray[i] > 0.4 && myArray[i] <= 0.8) {
                        //     str = str + '<td class="lightgreen-value">' + myArray[i] + '</td>';

                        // }
                        // else if (myArray[i] > 0.8 && myArray[i] <= 1.2) {
                        //     str = str + '<td class="yellow-value">' + myArray[i] + '</td>';

                        // }
                        // else if (myArray[i] > 1.2 && myArray[i] <= 1.6) {
                        //     str = str + '<td class="orange-value">' + myArray[i] + '</td>';

                        // }


                        // else {
                        //     str = str + '<td class="vlow-value">' + myArray[i] + '</td>';
                        // }


                        if (myArray[i] > 2.5 && myArray[i] <= 10) {
                            str = str + '<td class="darkgreen-value">' + myArray[i] + '</td>';

                        }

                        else if (myArray[i] > 1.3 && myArray[i] <= 2.5) {
                            str = str + '<td class="lightgreen-value">' + myArray[i] + '</td>';


                        }
                        else if (myArray[i] > 0.8 && myArray[i] <= 1.3) {
                            str = str + '<td class="yellow-value">' + myArray[i] + '</td>';


                        }
                        else if (myArray[i] > 0.4 && myArray[i] <= 0.8) {
                            str = str + '<td class="orange-value">' + myArray[i] + '</td>';


                        }
                        else {
                            str = str + '<td class="vlow-value">' + myArray[i] + '</td>';

                        }

                        if (sort1[j].split(',,')[2] > 80 && sort1[j].split(',,')[2] <= 100) {
                            str = str + '<td class="darkgreen-value">' + sort1[j].split(',,')[2] + '</td>';

                        }



                        else if (sort1[j].split(',,')[2] > 60 && sort1[j].split(',,')[2]) {

                            str = str + '<td class="lightgreen-value">' + sort1[j].split(',,')[2] + '</td>';

                        }
                        else if (sort1[j].split(',,')[2] > 40 && sort1[j].split(',,')[2] <= 60) {

                            str = str + '<td class="yellow-value">' + sort1[j].split(',,')[2] + '</td>';

                        }
                        else if (sort1[j].split(',,')[2] > 20 && sort1[j].split(',,')[2] <= 40) {

                            str = str + '<td class="orange-value">' + sort1[j].split(',,')[2] + '</td>';


                        }
                        else {

                            str = str + '<td class="vlow-value">' + sort1[j].split(',,')[2] + '</td>';

                        }



                        if (sort1[j].split(',,')[3] > 80 && sort1[j].split(',,')[3] <= 100) {
                            str = str + '<td class="darkgreen-value">' + sort1[j].split(',,')[3] + '</td>';

                        }



                        else if (sort1[j].split(',,')[3] > 60 && sort1[j].split(',,')[3] <= 80) {
                            str = str + '<td class="lightgreen-value">' + sort1[j].split(',,')[3] + '</td>';

                        }
                        else if (sort1[j].split(',,')[3] > 40 && sort1[j].split(',,')[3] <= 60) {

                            str = str + '<td class="yellow-value">' + sort1[j].split(',,')[3] + '</td>';

                        }
                        else if (sort1[j].split(',,')[3] > 20 && sort1[j].split(',,')[3] <= 40) {

                            str = str + '<td class="orange-value">' + sort1[j].split(',,')[3] + '</td>';

                        }
                        else {

                            str = str + '<td class="vlow-value">' + sort1[j].split(',,')[3] + '</td>';
                        }


                        // str = str + '<td>' + myArray[i] + '</td>';
                        str = str + '<td><center><button onclick="myfunn1(\'' + myArray[i] + ",," + sort1[j].split(',,')[0] + '\')">+</button></center></td>';
                        str = str + '</tr>';
                    }
                }
            }
            str = str + '</table>';
            document.getElementById('table').innerHTML = str;
            // '<td onclick="myfun(\'' + filteredData[j] + '\')">'
        }

        function myfunn(index) {
            // alert(index)
            console.log(index)
            let img = '';
            let text = ''
            if (index > '2.5' && index <= '10') {

                img = '<img src="https://drive.google.com/thumbnail?id=1zhGdQ6sxr67JinDTvFzmhFLcmHEzdboh" alt="Page Image">';

                text = index.split(',,')[1]
            }
            else if (index > '1.3' && index <= '2.5') {

                img = '<img src="https://drive.google.com/thumbnail?id=1C60IZr8uagF6LQDGZucOJqRoSyhqgREZ" alt="Page Image">';
                text = index.split(',,')[1]
            }
            else if (index > '0.8' && index <= '1.3') {


                img = '<img src="https://drive.google.com/thumbnail?id=1TViDmHt1TzGix67THyy_8lAQ4Tb4ja30" alt="Page Image">';
                text = index.split(',,')[1]
            }
            else if (index > '0.4' && index <= '0.8') {

                img = '<img src="https://drive.google.com/thumbnail?id=1cbOqENyYkRcqVXiEcRad7Iw5YAkaQy3Q" alt="Page Image">';
                text = index.split(',,')[1]
            }

            else {

                img = '<img src="https://drive.google.com/thumbnail?id=1_Y0qgCP60on471bY6qVFVZLJtqPwyqQh" alt="Page Image">';
                text = index.split(',,')[1]
            }

            document.getElementById('image').innerHTML = img;
            document.getElementById('text').innerHTML = text;
        }
    </script>

</body>

</html>
