import { Component,Input,Output,OnInit} from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { LoaderService } from 'src/app/loader.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
declare var google: any;
import * as $ from 'jquery';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
      
    
      lang: any = '';
      data: any = '';
      map: any;
      latlng: any;
      latitude: any;
      longitude: any;
      mapcity: any;
      maplocation: any;
      google:any='';
      geolocation:any='';
      enterloc: any = '';

      popshow:any='0';
      Userdata:any='';
      servicedata:any = [];
      goomap: any;
      maphow: any;

      id:any='';
      city:any='';
      address:any='';
      is_default:any=0;
      note:any='';
      address_title:any='';
      DefaultLocation:any='';
      activity_type:any='';
      place_type:any='';
      locationType:any='';
      locationdata:any=[];
      direction:any='';
      constructor(private translate: TranslateService,private toastr: ToastrService,public router: Router,public rest: RestService,private loaderService: LoaderService)
      {
		this.Userdata=JSON.parse(localStorage.getItem('userData') || '{}');
            this.locationdata=JSON.parse(localStorage.getItem('locationData') || '{}');
            this.locationType=localStorage.getItem('locationType');
            console.log(this.locationdata)
           
            this.getLocation();
            
            if(this.locationType==1){
                  this.getdata();
                  this.popshow='2';
            }
            this.translate.setDefaultLang('en');
      }

      ngOnInit (){
            this.translate.addLangs(['en', 'ar','zh','ur']);
            if (localStorage.getItem('DefaultLang') == 'en') {
                  this.translate.setDefaultLang('en');
            } 
            else if (localStorage.getItem('DefaultLang') == 'ar') {
                  this.translate.setDefaultLang('ar');
                  document.dir = this.direction;
            } 
            else if (localStorage.getItem('DefaultLang') == 'zh'){
                  
                  this.translate.setDefaultLang('zh');
            }else if(localStorage.getItem('DefaultLang') == 'ur'){

                  this.translate.setDefaultLang('ur');
            }
      }
      popopenfun(type:any){
            this.popshow=type;
      }
    
      getdata(){
            
            this.is_default=this.locationdata.is_default;
            this.note=this.locationdata.note;
            this.place_type=this.locationdata.place_type;
            this.activity_type=this.locationdata.activity_type;
            this.address=this.locationdata.address;
            this.address_title=this.locationdata.address_title;
            this.city=this.locationdata.city;
            this.id=this.locationdata.id;
      }

      getLocation() {

            if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position: any) => {
                        if (position) {

                              
                              this.loadmap(position.coords.latitude, position.coords.longitude);
                              localStorage.setItem("choose_lat", '' + position.coords.latitude);
                              localStorage.setItem("choose_lng", '' + position.coords.longitude);
                        }
                  },
                        (error) => console.log(error));
            } else {
                  this.loadmap('24.7136', "46.6753");
                  localStorage.setItem("choose_lat", '24.7136');
                  localStorage.setItem("choose_lng", '46.6753');

            }
      }

      loadmap(lata: any, langa: any) {

            this.latitude = Number(lata);
            this.longitude = Number(langa);

            console.log('lat',this.latitude);
            console.log('lang',this.longitude);
            var myStyles = [
                  {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [
                              { visibility: "off" }
                        ]
                  }
            ];
            var latlng = new google.maps.LatLng(Number(this.latitude), Number(this.longitude));
            let mapOptions = {
                  center: latlng,
                  zoom: 15,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,

                  styles: myStyles
            }
            this.map = new google.maps.Map(document.getElementById("hole_page"), mapOptions);
            var marker = new google.maps.Marker({
                  position: latlng,
                  map: this.map,
                  draggable: true
            });
            let geocoder = new google.maps.Geocoder;
            geocoder.geocode({ 'location': { 'lat': this.latitude, 'lng': this.longitude } }, (result: any, status: any) => {
                  this.enterloc = result[0].formatted_address;
                  $("#enterlocid").val(this.enterloc);
                  this.getcityfun(result[0]);
                  this.enterloc = result[0].formatted_address;
                  console.log('ppppp',this.enterloc)
                 
            })
            var input = document.getElementById('enterlocid');
            var autocomplete = new google.maps.places.Autocomplete(input);

            google.maps.event.addListener(autocomplete, 'place_changed', () => {

                  let place = autocomplete.getPlace();
                  this.enterloc = place.formatted_address;
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();
                  $("#enterlocid").val(this.enterloc);
                  this.getcityfun(place);
                  var latlng = new google.maps.LatLng(Number(this.latitude), Number(this.longitude));
                  let mapOptions = {
                        center: latlng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: true,
                        styles: myStyles
                  }
                  this.map = new google.maps.Map(document.getElementById("hole_page"), mapOptions);
                  var marker = new google.maps.Marker({
                        position: latlng,
                        map: this.map,
                        draggable: true
                  });
            }, (err: any) => {
                  console.log("Eroorrr", err)

            });
            google.maps.event.addListener(this.map, 'click', (event: any) => {
                  if (event.cancelable) {
                        event.preventDefault();
                  }
                  this.latitude = event.latLng.lat();
                  this.longitude = event.latLng.lng();
                  var latlng = new google.maps.LatLng(Number(event.latLng.lat()), Number(event.latLng.lng()));
                  if (marker && marker.setMap) {
                        marker.setMap(null);
                  }
                  marker = new google.maps.Marker({
                        position: latlng,
                        map: this.map,
                  });
                  let geocoder = new google.maps.Geocoder;
                  geocoder.geocode({ 'location': { 'lat': this.latitude, 'lng': this.longitude } }, (result: any, status: any) => {
                        this.enterloc = result[0].formatted_address;
                        
                        this.getcityfun(result[0]);

                        $("#enterlocid").val(this.enterloc);
                        
                  })
            });
            google.maps.event.addListener(marker, 'dragend', (event: any) => {
                  this.latitude = marker.getPosition().lat();
                  this.longitude = marker.getPosition().lng();
                  let geocoder = new google.maps.Geocoder;
                  geocoder.geocode({ 'location': { 'lat': this.latitude, 'lng': this.longitude } }, (result: any, status: any) => {
                        this.enterloc = result[0].formatted_address;
                      
                        this.getcityfun(result[0]);
                        $("#enterlocid").val(this.enterloc);
                  })
            })

           
      }


      getmapfuns() {
           
            let adddata = {
                  lat: this.latitude,
                  lng: this.longitude,
            }
            this.maphow.addvalueinlocation(JSON.stringify(adddata));
            
      }

      gotookaybtnfun() {

           
            this.popshow='2';
            var actt:any = [];
            let adddata = {
                  lat: this.latitude,
                  lng: this.longitude,
                  address: this.enterloc,
                  city: this.mapcity,
                  location: this.maplocation,
                
            }
            actt.push(adddata);
            this.locationdata=actt[0];

            
      }
      getcityfun(alladdress: any) {
           
            var value = alladdress.address_components;
            var count = value.length;
            var checknu = value[count - 1].long_name;
            if (isNaN(checknu)) {
                  var city = value[count - 3];
                  var city = value[count - 3];
                  var locati = value[0].long_name + ' ' + value[1].long_name;
                  var newcite = city.long_name;
                  this.mapcity = newcite;
                  this.maplocation = locati;
            }
            else {
                  var city = value[count - 4];
                  var locati = value[1].long_name + ' ' + value[2].long_name;
                  var newcite = city.long_name;
                  this.mapcity = newcite;
                  this.maplocation = locati;
            }
           
      }

      place_typeFun(ty:any)
	{
		this.place_type=ty;
	}

      activity_typefun(ty:any){
		this.activity_type=ty;
	}


      Addlocationfun()
      {
           
            this.servicedata = [];
            this.servicedata.push({"customer_id":this.Userdata.customer_id});
            this.servicedata.push({"address_title":this.address_title});
            this.servicedata.push({"id":this.id});
            this.servicedata.push({"address":this.locationdata.address});
            this.servicedata.push({"city":this.locationdata.city});
            this.servicedata.push({"lat":this.locationdata.lat});
            this.servicedata.push({"lng":this.locationdata.lng});
            this.servicedata.push({"note":this.note});
            this.servicedata.push({"place_type":this.place_type});
            this.servicedata.push({"activity_type":this.activity_type});
            this.servicedata.push({"is_default":this.is_default});
            this.rest.serverdataposttwo("changeLocation",this.servicedata).subscribe( res => {
                  let data:any=res;
                  if(data.status==true)
                  {
                        this.popshow=0;
                        this.router.navigate(["/user/saved-location"]);
                        this.rest.translatetsfiledata('Location_saved_sucessfully','Success');
                       
                  }
                  else{
                  
                  }
            },error => {
                  console.log(error);
            });
             
      }

      checkboxfun(ty:any){
            
            if(ty==1){
                  this.is_default='1';
            }else {
                  this.is_default='0';
            }
      }
}
