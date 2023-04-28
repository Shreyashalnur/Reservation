import { LightningElement, track, wire } from 'lwc';
import getHotels from '@salesforce/apex/HotelClass.getHotels';


export default class HotelCardList extends LightningElement {

    
    hotels;
    error;
    searchwords='';
    isSearchable = false;

    connectedCallback(){
        this.loadHotels(this.searchwords);
    }

    handlesearch(event){

        this.searchwords = event.target.value;
        this.loadHotels(this.searchwords);
    }

    loadHotels(searchwords){

        getHotels({searchkey: searchwords})
        .then(result =>{
            this.hotels = result;
            console.log("this.hotels:"+JSON.stringify(this.hotels));

            if(this.hotels.length > 0){
                this.isSearchable = false;
            } else{
                this.isSearchable = true;
            }
        })

        .catch(error => {
            this.isSearchable = false;
            this.error = error;
        })

    }



    
}