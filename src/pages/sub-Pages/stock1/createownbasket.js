<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSV File Reader with Automatic Search</title>
    <style>
        .add-button-cell {
            border: none;
        }

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

   
    <p id="basket"></p>
    <p id="basket1"></p>
    <p id="reset"></p>
    

    <label for="searchBar"><b>Search your stock:</b></label>
    <input type="text" id="searchBar">
    <div style="display: flex; justify-content:space-evenly;">
        <div>
            <p id="table"></p>


        </div>
        <div>
            <p id="value" style="margin-left:60px;margin-bottom:-20px;"></p>
            <p id="image"></p>

        </div>
    </div>


    <script>

        var values = [];
        var filteredData;
        fetch('https://sheets.googleapis.com/v4/spreadsheets/1AMJIekwmTduIjNvExBDT3MjuV8gtOUFL-cofVR9gF5Y/values/totalmarketcap?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k')
            .then(response => response.json())
            .then(response => {
                values = response.values.slice(1);;
                // console.log(values)
                var sliced = values.slice(1);
                console.log(sliced);


            })
        var csvDataArray = [];

       
        document.getElementById('searchBar').addEventListener('input', function () {
            filterData();
        });

        function filterData() {


            if (document.getElementById('searchBar').value == "") {
                console.log("empty")
                document.getElementById('table').innerHTML = "";
            }
            else {

                var searchTerm = document.getElementById('searchBar').value.toLowerCase();

               
                filteredData = values.filter(function (row) {
                    return row.some(function (cell) {
                        return cell.toLowerCase().includes(searchTerm);
                    });
                });
                console.log(filteredData);
                let str = "";
                str = str + '<table border=1>';
                str = str + '<tr>';
                str = str + '<td>Stocks</td>';
                str = str + '<td onclick="sorting()">%</td>';
                str = str + '<td>Quality</td>';
                str = str + '<td>Growth</td>';
                str = str + '<td>Add</td>';
                str = str + '</tr>';
                for (j = 0; j < filteredData.length; j++) {
                    str = str + '<tr>';
                    str = str + '<td onclick="myfun(\'' + filteredData[j] + '\')">' + filteredData[j][0] + '</td>';
                    if (filteredData[j][4] > 2.5 && filteredData[j][4] <= 10) {
                        str = str + '<td class="darkgreen-value">' + filteredData[j][4] + '</td>';
                    }
                    else if (filteredData[j][4] > 1.3 && filteredData[j][4] <= 2.5) {
                        str = str + '<td class="lightgreen-value">' + filteredData[j][4] + '</td>';

                    }
                    else if (filteredData[j][4] > 0.8 && filteredData[j][4] <= 1.3) {
                        str = str + '<td class="yellow-value">' + filteredData[j][4] + '</td>';

                    }
                    else if (filteredData[j][4] >0.4 && filteredData[j][4] <= 0.8) {
                        str = str + '<td class="orange-value">' + filteredData[j][4] + '</td>';

                    }


                    else {
                        str = str + '<td class="vlow-value">' + filteredData[j][4] + '</td>';
                    }


                    if (filteredData[j][5] > 80 && filteredData[j][5] <= 100) {
                        str = str + '<td class="darkgreen-value">' + filteredData[j][5] + '</td>';
                    }
                    else if (filteredData[j][5] > 60 && filteredData[j][5] <= 80) {
                        str = str + '<td class="lightgreen-value">' + filteredData[j][5] + '</td>';

                    }
                    else if (filteredData[j][5] > 40 && filteredData[j][5] <= 60) {
                        str = str + '<td class="yellow-value">' + filteredData[j][5] + '</td>';

                    }
                    else if (filteredData[j][5] >20 && filteredData[j][5] <= 40) {
                        str = str + '<td class="orange-value">' + filteredData[j][5] + '</td>';

                    }


                    else {
                        str = str + '<td class="vlow-value">' + filteredData[j][5] + '</td>';
                    }


                    if (filteredData[j][6] > 80 && filteredData[j][6] <= 100) {
                        str = str + '<td class="darkgreen-value">' + filteredData[j][6] + '</td>';
                    }
                    else if (filteredData[j][6] > 60 && filteredData[j][6] <= 80) {
                        str = str + '<td class="lightgreen-value">' + filteredData[j][6] + '</td>';

                    }
                    else if (filteredData[j][6] > 40 && filteredData[j][6] <= 60) {
                        str = str + '<td class="yellow-value">' + filteredData[j][6] + '</td>';

                    }
                    else if (filteredData[j][6] >20 && filteredData[j][6] <= 40) {
                        str = str + '<td class="orange-value">' + filteredData[j][6] + '</td>';

                    }


                    else {
                        str = str + '<td class="vlow-value">' + filteredData[j][6] + '</td>';
                    }
                    str = str + '<td class="add-button-cell"><button onclick="handleClick(\'' + filteredData[j] + '\')">+</button></td>';
                    str = str + '</tr>';
                }

                str = str + '</table>';



                document.getElementById('table').innerHTML = str;
                console.log("Filtered data:", filteredData);
                document.getElementById('image').innerHTML = '';
                document.getElementById('value').innerHTML = '';
            }
        }


       

        var sett = new Set();

        function handleClick(index) {


            if (index.split(',')[4] < 0 || index.split(',')[4] == null || index.split(',')[4] == 0) {
                console.log(index.split(',')[4] + "lessvalue");
            }
            else {
                let arr5 = 0;
                let arrr1 = 0;
                sett.add(index.split(',')[0] + "," + index.split(',')[4])
                let arrr = Array.from(sett);
                // console.log(arrr[0].split(',')[1] + "arrr");
                for (j = 0; j < arrr.length; j++) {
                    arrr1 = arrr1 + (+ arrr[j].split(',')[1])
                }
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
                    str1 = str1 + "<td>" + arrr[i].split(',')[0] + "</td>";
                    if (arrr[i].split(',')[1]) {
                        console.log(arrr[i].split(',')[1])
                        arr5 =  arrr[i].split(',')[1]
                        console.log(arr5)
                        str1 = str1 + "<td>" + ((arr5 / arrr1) * 100).toFixed(1) + "</td>";
                    }
                    str1 = str1 + "<td><button onclick='deleteRow(" + parseInt(i) + ", \"" + arrr[i] + "\")'>-</button></td>";
                    str1 = str1 + "</tr>";
                }
                str1 = str1 + "</table>";

                // document.getElementById("reset").innerHTML = button
                document.getElementById("basket1").innerHTML = str1;
            }


        }


        function deleteRow(index, index1) {

            document.getElementById(index).remove();

            sett.delete(index1);

            if (sett.size == 0) {
                document.getElementById("basket1").innerHTML = "";
            }

        }



        function sorting() {
            // document.getElementById("basket").innerHTML = "";
            filteredData.sort((a, b) => a[4] - b[4]);

            // Print the sorted data
            console.log(filteredData);

            let str = "";
            str = str + '<table border=1>';
            str = str + "<tr>";
            str = str + "<td><b>Stock</b></td>";
            str = str + "<td><b> % </b></td>";
            str = str + "<td><b>Quality</b></td>";
            str = str + "<td><b> Growth </b></td>";
            str = str + '<td>Add</td>';
            str = str + "</tr>";
            for (j = 0; j < filteredData.length; j++) {
                str = str + '<tr>';
                str = str + '<td onclick="myfun(\'' + filteredData[j] + '\')">' + filteredData[j][0] + '</td>';

                if (filteredData[j][4] > 2.5 && filteredData[j][4] <= 10) {
                        str = str + '<td class="darkgreen-value">' + filteredData[j][4] + '</td>';
                    }
                    else if (filteredData[j][4] > 1.3 && filteredData[j][4] <= 2.5) {
                        str = str + '<td class="lightgreen-value">' + filteredData[j][4] + '</td>';

                    }
                    else if (filteredData[j][4] > 0.8 && filteredData[j][4] <= 1.3) {
                        str = str + '<td class="yellow-value">' + filteredData[j][4] + '</td>';

                    }
                    else if (filteredData[j][4] >0.4 && filteredData[j][4] <= 0.8) {
                        str = str + '<td class="orange-value">' + filteredData[j][4] + '</td>';

                    }


                    else {
                        str = str + '<td class="vlow-value">' + filteredData[j][4] + '</td>';
                    }

                    if (filteredData[j][5] > 80 && filteredData[j][5] <= 100) {
                        str = str + '<td class="darkgreen-value">' + filteredData[j][5] + '</td>';
                    }
                    else if (filteredData[j][5] > 60 && filteredData[j][5] <= 80) {
                        str = str + '<td class="lightgreen-value">' + filteredData[j][5] + '</td>';

                    }
                    else if (filteredData[j][5] > 40 && filteredData[j][5] <= 60) {
                        str = str + '<td class="yellow-value">' + filteredData[j][5] + '</td>';

                    }
                    else if (filteredData[j][5] >20 && filteredData[j][5] <= 40) {
                        str = str + '<td class="orange-value">' + filteredData[j][5] + '</td>';

                    }


                    else {
                        str = str + '<td class="vlow-value">' + filteredData[j][5] + '</td>';
                    }


                    if (filteredData[j][6] > 80 && filteredData[j][6] <= 100) {
                        str = str + '<td class="darkgreen-value">' + filteredData[j][6] + '</td>';
                    }
                    else if (filteredData[j][6] > 60 && filteredData[j][6] <= 80) {
                        str = str + '<td class="lightgreen-value">' + filteredData[j][6] + '</td>';

                    }
                    else if (filteredData[j][6] > 40 && filteredData[j][6] <= 60) {
                        str = str + '<td class="yellow-value">' + filteredData[j][6] + '</td>';

                    }
                    else if (filteredData[j][6] >20 && filteredData[j][6] <= 40) {
                        str = str + '<td class="orange-value">' + filteredData[j][6] + '</td>';

                    }


                    else {
                        str = str + '<td class="vlow-value">' + filteredData[j][6] + '</td>';
                    }





               
                str = str + '<td class="add-button-cell"><button onclick="handleClick(\'' + filteredData[j] + '\')">+</button></td>';

                str = str + '</tr>';
                // sort.push(filteredData[j][0]);
                // sort1.push(values[i][0] + ',,' + values[i][4])
            }

            str = str + '</table>';
            document.getElementById('table').innerHTML = str;

        }


        function myfun(index) {
            // document.getElementById('table').innerHTML = '';
            let img = '';
            let text = ''
            console.log(index.split(',')[0])
            if (index.split(',')[4] > '2.5' && index.split(',')[4] <= '20') {

                // let img1 = 'C:/Users/DELL/Documents/1 risk.png'
                img = '<img src="https://drive.google.com/thumbnail?id=1zhGdQ6sxr67JinDTvFzmhFLcmHEzdboh" alt="Page Image">';
                text = index.split(',')[0]

            }
            else if (index.split(',')[4] > '1.3' && index.split(',')[4] <= '2.5') {

                // let img1 = 'C:/Users/DELL/Documents/2 risk.png'

                img = '<img src="https://drive.google.com/thumbnail?id=1C60IZr8uagF6LQDGZucOJqRoSyhqgREZ" alt="Page Image">';
                text = index.split(',')[0]
            }
            else if (index.split(',')[4] > '0.8' && index.split(',')[4] <= '1.3') {
                // alert('its 2');
                // let img1 = 'C:/Users/DELL/Documents/3 risk.png'
                img = '<img src="https://drive.google.com/thumbnail?id=1TViDmHt1TzGix67THyy_8lAQ4Tb4ja30" alt="Page Image">';
                text = index.split(',')[0]
            }
            else if (index.split(',')[4] > '0.4' && index.split(',')[4] <= '0.8') {
                // alert('its 2');
                // let img1 = 'C:/Users/DELL/Documents/4 risk.png'
                img = '<img src="https://drive.google.com/thumbnail?id=1cbOqENyYkRcqVXiEcRad7Iw5YAkaQy3Q" alt="Page Image">';
                text = index.split(',')[0]
            }

            else {
                // let img1 = 'C:/Users/DELL/Documents/5 risk.png'
                img = '<img src="https://drive.google.com/thumbnail?id=1_Y0qgCP60on471bY6qVFVZLJtqPwyqQh" alt="Page Image">';
                text = index.split(',')[0]
            }

            document.getElementById('value').innerHTML = text;
            document.getElementById('image').innerHTML = img;
        }
    </script>

</body>

</html>
