$(()=>{

    $.get('./scripts/index.php',function(data,status){
        let newData = {};
        let meter_details = JSON.parse(data);
        meter_details.forEach((ele)=>{
            newData = ele;
        })
        //meter_id
        let meter_id = parseInt(newData.id);
        let availablePower = parseFloat(newData.available_credit);

        /**
         * method for changing the available power
         */
            function consumeEnergy(availablePower){
                $('.power-output').text(availablePower + ' kw');   
            }

       /**
        *  method for sending updated power
        */
            let updates = (availablePower,meter_id) => {
                let data_parsed = {
                    availablePower,
                    meter_id
                }
                /**
                 *  Post data to the database
                 */
                $.ajax({
                    url:"./scripts/update.php",
                    type:"POST",
                    data:data_parsed,
                    success:function(status,data){
                        console.log(data_parsed);
                    },
                    failure:function(){
                        console.log('failure')
                    }
                })
            }

            //updating the database on interval
            let autoUpdate = setInterval(()=>{
                availablePower= availablePower - 0.19999978 ;
                consumeEnergy(availablePower);
                updates(availablePower,meter_id);
            },2200)

       
        $('.text-1 h2').text(newData.meter_number);

    })
})                           