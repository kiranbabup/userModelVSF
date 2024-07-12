<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Searched</title>
</head>

<body>
    <input type="text" id="searchInput" placeholder="Enter search term" />
    <p id="table1"></p>
    <p id="resultsList"></p>

    <script>
        const apiKey = 'AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k';

        function fetchAndDisplayResults(searchTerm) {
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/1NS5VblGblodP1jebtGFyhClaD0PmGH_CVOLKSS8uCOY/values/benchmark?alt=json&key=${apiKey}`)
                .then(response => response.json())
                .then(response => {
                    const valuesSheet = response.values.slice(1); 
                    console.log('Data from Sheet 1:', valuesSheet);

                    const resultsList = document.getElementById('resultsList');
                    resultsList.innerHTML = '';

                  
                    let str = '';
                    str += '<table border="1">';
                    valuesSheet.forEach((row, index) => {

                        const columnValue = row[2].toLowerCase();
                        if (columnValue.includes(searchTerm)) {
                            str += '<tr>'
                            str += '<td>' + row[2] + '</td>';
                            str += '<td>' + row[9] + '</td>';
                            str += '<td>' + row[10] + '</td>';
                            str += '<td>' + row[11] + '</td>';
                            str += '<td><button onclick="myfunn1(\'' + row[2] + ",," + row[9] + '\')">+</button></td>';

                            str += '</tr>';

                        }
                    });
                    document.getElementById('resultsList').innerHTML = str
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        var mySet = new Set();

        function myfunn1(index) {
            console.log(index)
            console.log(index.split(',,')[1]);

            if (index.split(',,')[1] <= 0 || index.split(',,')[1] === 'null' || index.split(',,')[1] === 'undefined') {
                console.log(index.split(',,')[1] + "lessvalue");
            }
            else {
                // alert(index.split(',,')[0])
                let arr5 = 0;
                let arrr1 = 0;
                mySet.add(index.split(',,')[0] + "," + index.split(',,')[1])
                let array = Array.from(mySet);
                console.log(array + 'arrr')
                console.log(array.length + 'arrr,legth')
                console.log(array[0].split(',')[0] + 'arrr,split')
                for (j = 0; j < array.length; j++) {
                    arrr1 = arrr1 + (+ array[j].split(',')[1])
                }
                console.log(arrr1)
                let str1 = "";
                str1 = str1 + "<table id='myTable' border=1>";
                str1 = str1 + "<tr>";
                str1 = str1 + "<td><b> # </b></td>";
                str1 = str1 + "<td><b>Stock</b></td>";
                str1 = str1 + "<td onclick='sorting()'><b> % </b></td>";
                str1 = str1 + "<td><b>Del</b></td>";
                str1 = str1 + "</tr>";
                for (i = 0; i < array.length; i++) {
                    str1 = str1 + "<tr id=" + i + ">";
                    str1 = str1 + "<td>" + [i + 1] + "</td>";
                    str1 = str1 + "<td>" + array[i].split(',')[0] + "</td>";
                    if (array[i].split(',')[1]) {
                        console.log(array[i].split(',')[1])
                        arr5 = array[i].split(',')[1]
                        console.log(arr5)
                        str1 = str1 + "<td>" + ((arr5 / arrr1) * 100).toFixed(1) + "</td>";
                    }
                    str1 = str1 + "<td><button onclick='deleteRow(" + parseInt(i) + ", \"" + array[i] + "\")'>-</button></td>";
                    str1 = str1 + "</tr>";
                }
                str1 = str1 + "</table>";
                document.getElementById("table1").innerHTML = str1;
            }
        }

        // Event listener for input changes
        document.getElementById('searchInput').addEventListener('input', function () {
            const searchTerm = this.value.trim().toLowerCase();
            fetchAndDisplayResults(searchTerm);
        });

        function deleteRow(index, index1) {
            document.getElementById(index).remove();
            let arr5 = 0;
            let arrr1 = 0;

            mySet.delete(index1);
            console.log(mySet);
            let arrr = Array.from(mySet);
            console.log(arrr + 'arrr')
            // console.log(arrr[0].split(',')[1] + "arrr");
            for (j = 0; j < arrr.length; j++) {
                arrr1 = arrr1 + (+ arrr[j].split(',')[1])
            }
            console.log(arrr)
            console.log(arrr1);

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
                    arr5 = arrr[i].split(',')[1]
                    console.log(arr5)
                    str1 = str1 + "<td>" + ((arr5 / arrr1) * 100).toFixed(1) + "</td>";
                }
                str1 = str1 + "<td><button onclick='deleteRow(" + parseInt(i) + ", \"" + arrr[i] + "\")'>-</button></td>";
                str1 = str1 + "</tr>";
            }
            str1 = str1 + "</table>";
            document.getElementById("table1").innerHTML = str1;
            if (mySet.size == 0) {
                document.getElementById("table1").innerHTML = "";
            }


        }
    </script>
</body>

</html>