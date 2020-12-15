


class watchlist{



     sortTable(n) {

        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("my_table");
        switching = true;
        // Set the sorting direction to ascending:
        var dir = "desc";
        // Set whether to sort by number
        var sortByNumber = false
        if ((n==4) || (n==3)){
            sortByNumber = true
        }
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (sortByNumber == false )
                    {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            // If so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                            
                        }
                    }
                    else
                    {

                        if (Number(x.innerHTML.slice(0, -1) ) < Number(y.innerHTML.slice(0, -1) )) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                else if (dir == "desc") {
                    if (sortByNumber == false )
                    {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                        }
                    }
                    else
                    {

                        if (Number(x.innerHTML.slice(0, -1) ) < Number(y.innerHTML.slice(0, -1) )) {
                        shouldSwitch = true;
                        break;
                        }
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount ++;
            }
            else
            {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
    

    mouseOver(){
        alert('3');
    }



    remove_from_server_db(stock_symbol){
        const http_post = new XMLHttpRequest();
        const url='http://127.0.0.1:8000/remove_from_watchlist';
        var params = 'symbol='+stock_symbol;
        http_post.open("POST", url,true);
        http_post.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http_post.send(params);
        sleep(1000);
        
    }


    add_new_row_to_table(stock_symbol,eps_array,net_income_array,sales_array, volume_change, price_change, current_price){
        var ref = this
        var table = document.getElementById("my_table");    
        var row = table.insertRow(1);
        row.id = stock_symbol
        var enter = "\r\n";

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        // Add link to stock symbol
    
        var link = document.createElement('a');
        link.setAttribute('href', "https://stockcharts.com/h-sc/ui?s="+stock_symbol);
        link.setAttribute("target", "_blank");
        link.innerHTML = stock_symbol
        
        // add hovering to the stock symbol with details on the stocks

        var span = document.createElement('span');
        span.className = "tooltiptext2";
        span.textContent  = "Eps is :   "+eps_array.join(' ,  ') +  enter + "Net Income is : " + net_income_array.join(' ,  ')+ enter+ "Sales is : "+ sales_array.join(' ,  ');

       
       // add remove button option for every stock

       var remove_button = document.createElement('button');
       remove_button.className = "button"
       remove_button.innerHTML = 'Remove';
       remove_button.onclick = function(){
            var row = remove_button.parentNode.parentNode;
            row.parentNode.removeChild(row);
            ref.remove_from_server_db(row.id)
       }
       
       
        cell1.appendChild(link);
        cell1.className = "tooltip2";
        cell1.appendChild(span);   

        cell2.innerHTML = '';
        cell3.innerHTML = current_price;
        cell4.innerHTML = volume_change;
        cell5.innerHTML = price_change;
        cell6.appendChild(remove_button)

    
    
    }

    
    update_color_of_cell(cell, price_change){
    
    
        if (price_change > 0){
            cell.innerHTML.style.backgroundColor = "green";
        }
        else{
            cell.innerHTML.style.backgroundColor = "red";
        }
    
    
    }
    

    
    
    showSpinner() {
        this.loadingDiv.style.visibility = 'visible';
    }
      
    hideSpinner() {
        this.loadingDiv.style.visibility = 'hidden';
    }
      
    
    update_key_of_table(stock_symbol,eps_array,net_income_array,sales_array, volume_change, price_change, current_stock_price){
    
        var row = document.getElementById(stock_symbol);
        row.cells[2].innerHTML = current_stock_price
        row.cells[3].innerHTML = volume_change;
        row.cells[4].innerHTML = price_change;

        //update_color_of_cell(row.cells[5],price_change)
    
    }
    
    
    get_volume_update(){
    
        var ref = this
        const Http = new XMLHttpRequest();
        const url='http://127.0.0.1:8000/volume_update/';
        Http.open("GET", url,true);
    
        Http.send();
        Http.addEventListener("readystatechange", function() {
            //The operation is complete
            if (this.readyState === 4) {
                // http response success
                if (Http.status === 200) {
                    var stock_dict = Http.responseText;
                    var stock_dict_parsed = JSON.parse(stock_dict);
                    for (var key in stock_dict_parsed){
                        // stock is in the table therefore update the values
                        if (document.getElementById(key) != null){
                            ref.update_key_of_table( key, stock_dict_parsed[key][0], stock_dict_parsed[key][1], stock_dict_parsed[key][2], stock_dict_parsed[key][3],stock_dict_parsed[key][4],stock_dict_parsed[key][5],stock_dict_parsed[key][6]);
                        }
                        // stock is not in the table therefore add new row
                        else{
                            ref.add_new_row_to_table( key, stock_dict_parsed[key][0], stock_dict_parsed[key][1], stock_dict_parsed[key][2], stock_dict_parsed[key][3],stock_dict_parsed[key][4],stock_dict_parsed[key][5],stock_dict_parsed[key][6]);
                        }
                    }

                    if (ref.first_time_run == true){
                        ref.hideSpinner();
                        ref.first_time_run = false
                    }
                }
            }
        });
    };
    
    // utility function to get get_volume_update to run first and then every interval getting an update
    setIntervalAndExecute(fn, t) {
       // showSpinner();
        fn();
        return(setInterval(fn, t));
    }
    
    

    // get the values of a new stock, process and send to http django server.
    loaded() {
        var ref = this
        document.getElementById('add_form').addEventListener("submit", function() {
            var stock_symbol = this.elements[0].value

            const http_post = new XMLHttpRequest();
            const url='http://127.0.0.1:8000/get_stock_info';
            var params = 'symbol='+stock_symbol;
            http_post.open("POST", url,true);
            http_post.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            http_post.send(params);
            http_post.addEventListener("readystatechange", function() {
                //The operation is complete
                if (this.readyState === 4) {
                    // http response success
                    if (http_post.status === 200) {
                        var stock_dict = http_post.responseText;
                        var stock_dict_parsed = JSON.parse(stock_dict);
                        for (var key in stock_dict_parsed){
                            if (document.getElementById(key) == null){
                                ref.add_new_row_to_table( key, stock_dict_parsed[key][0], stock_dict_parsed[key][1], stock_dict_parsed[key][2], stock_dict_parsed[key][3],stock_dict_parsed[key][4],stock_dict_parsed[key][5]);
                            }
                        }
                    }
                }
            });
        });       
    }


    constructor() {  // Constructor
        this.buy_price 
        this.sell_price
        this.i;
        this.buy_price_map = new Map()
        this.sell_price_map = new Map()
        this.interval_var;
        this.table = document.getElementById("my_table");
        this.first_time_run = true
        this.loadingDiv = document.getElementById('loading');
        // binding functions
        this.setIntervalAndExecute = this.setIntervalAndExecute.bind(this);
        this.get_volume_update = this.get_volume_update.bind(this);
        this.sortTable = this.sortTable.bind(this);
        this.add_new_row_to_table = this.add_new_row_to_table.bind(this);
        this.update_color_of_cell = this.update_color_of_cell.bind(this);
        this.hideSpinner = this.hideSpinner.bind(this);
        this.showSpinner = this.showSpinner.bind(this);
        this.remove_from_server_db = this.remove_from_server_db.bind(this)
        this.loaded = this.loaded.bind(this);
        this.loaded();



        // running get_volume_update every refresh time.
        this.refresh_time = 9000;
        this.setIntervalAndExecute(this.get_volume_update, this.refresh_time);
    }

}