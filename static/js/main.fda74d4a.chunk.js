(this.webpackJsonpdsau=this.webpackJsonpdsau||[]).push([[0],{62:function(e){e.exports=JSON.parse('[{"name":"K-LAN","quarter":1,"description":"\xc5rligt LAN-party som afholdes i l\xf8bet af for\xe5ret. Det er gratis at deltage og DSAU s\xf8rger for aftensmad og morgenmad (implicit frokost best\xe5ende af rester). Derudover er der turneringer i diverse spil med pr\xe6mier."},{"name":"Studiestarts arrangement","quarter":3,"description":"Et arrangement som afholdes for de nye studerende. Finder typisk sted torsdag i rusugen arrangeret af DSAU i samarbejde med Prosa. Her er gratis aftensmad og billige drikkevarer."},{"name":"Generalforsamling","quarter":2,"description":"P\xe5 generalforsamlingen v\xe6lges nye medlemmer ind i DSAUs bestyrelse. Her dr\xf8ftes forslag og \xe6ndringer til vedt\xe6gterne ogs\xe5, og de stemmes om blandt de fremm\xf8dte medlemmer af foreningen. "},{"name":"Social Coding","quarter":4,"description":"Til social coding kan man f\xe5 lov til at arbejde p\xe5 programmeringsprojekter i f\xe6llesskab. Det kan evt. v\xe6re lidt hobbyprogrammering eller den aflevering som snart skal afleveres. Der vil ofte v\xe6re en lille morsom pr\xe6sentation samt rigelig pizza til de fremm\xf8dte."},{"name":"K-Dag","quarter":2,"description":"En karrieremesse afholdt af instituttet for de studerende i hele Katrinebjerg. P\xe5 dagen ankommer en stor r\xe6kke virksomheder, som fors\xf8ger at bejle til de studerende med gratis ting, mad og jobtilbud."},{"name":"Diverse Events","quarter":0,"description":"Foruden de ovenst\xe5ende begivenheder bliver der l\xf8bende arrangeret en r\xe6kke forskellige arrangementer. Disse kan v\xe6re alt fra lasertag, klatring p\xe5 klatrev\xe6g, kurser i frameworks og andre teknologier, osv. Begivenhederne kan sammen med de andre findes p\xe5 kalenderen her p\xe5 siden eller p\xe5 DSAUs Facebookside."}]')},63:function(e){e.exports=JSON.parse('[{"name":"Kristoffer Strube","class":2017,"title":"Formand","image":"strube.jpg","email":"strube@dsau.dk"},{"name":"S\xf8ren Eriksen","class":2017,"title":"N\xe6stformand","image":"s\xf8ren.jpg","email":"eriksen@dsau.dk"},{"name":"Mathias Tversted","image":"tversted.jpg","title":"Kasserer","email":"tversted@dsau.dk","class":2017},{"name":"Erik Funder Carstensen","class":2017,"title":"Menig","image":"erik.jpg","email":"erik@dsau.dk"},{"name":"Casper Rysgaard","class":2017,"title":"Menig","image":"rysgaard.png","email":"rysgaard@dsau.dk"},{"name":"Jeppe Kristensen","image":"jeppe.jpg","title":"Menig","email":"jeppe@dsau.dk","class":2017},{"name":"Magdalena Kalin","image":"magdalena.jpg","title":"Menig","email":"magdalena@dsau.dk","class":2018},{"name":"Simon Dohn","image":"dohn.jpg","title":"Menig","email":"dohn@dsau.dk","class":2019},{"name":"Steffan S\xf8lvsten","image":"steffan.jpg","title":"Menig","email":"steffan@dsau.dk","class":2015},{"name":"Anna Hallenberg","image":"anna.jpg","title":"Menig","email":"anna@dsau.dk","class":2019},{"name":"Anna Kathrine Jensen Skov","image":"skov.jpg","title":"Menig","email":"skov@dsau.dk","class":2019}]')},66:function(e,a,t){e.exports=t(98)},71:function(e,a,t){},72:function(e,a,t){},98:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(5),s=t.n(l),i=(t(71),t(18)),m=t(20),o=(t(72),t(65)),c=t(44),d=(t(95),t(61)),u=t.n(d),g=function(e){return r.a.createElement("div",null,r.a.createElement("em",null,e.event.name),r.a.createElement("p",null,e.event.description),r.a.createElement("p",null,"Placering: ",e.event.location))},v=function(e){var a=e.event?e.event.name:"no name",t=e.event?e.event.description:"no description",n=e.event?e.event.location:"no location",l=e.event?r.a.createElement("a",{style:{color:"#81c341"},href:"https://facebook.com/events/"+e.event.id,target:"_blank",rel:"noopener noreferrer"},"Facebook event"):r.a.createElement("p",null,"no event");return r.a.createElement("div",null,r.a.createElement("em",null,a),r.a.createElement("p",null,t),r.a.createElement("p",null,"Placering: ",n),l)},f=Object(c.b)(u.a),p=function(e){return r.a.createElement(c.a,{culture:"en-GB",events:e.events,localizer:f,defaultDate:new Date,components:{event:g,agenda:{event:v}},onSelectEvent:function(e){return a=e.id,void window.open("https://facebook.com/events/"+a,"_blank");var a},eventPropGetter:function(){return{style:{backgroundColor:"#424242",borderRadius:"5px",opacity:.8,color:"white",border:"0px",display:"block"}}}})},E=function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,e.name),e.quarter?r.a.createElement("h5",null,"Kvartal: Q",e.quarter):"",r.a.createElement("p",null,e.description))},k=t(62);function b(){var e=Object(n.useState)([]),a=Object(o.a)(e,2),t=a[0],l=a[1];Object(n.useEffect)((function(){return s()}),[]);var s=function(){fetch("https://graph.facebook.com/DSAUdk/events",{method:"get",headers:new Headers({Authorization:"Bearer EAAeEg2Lpd8EBAOhJ3S7INLOsWzyrZAWJjtohIwO71qrOr75TGj00Rf6C7y6TEv7ZCYDg6ADqzOzZALhRtleZBDOAqZAihZAbPqP3M6zm8rQKtQxyztLFcJyHHR7JuQAMKOphwfm5CHAcQahVfhZCLI2ZC4ghG8FZBmZCbl4oEqZADgj8AZDZD"})}).then((function(e){return e.json()})).then((function(e){for(var a=e.data,t=0;t<a.length;t++)a[t]=h(a[t]);l(a)}))};return r.a.createElement("div",null,r.a.createElement("h1",null,"Events"),r.a.createElement("p",null,"P\xe5 denne side finder du vores kalender for events, disse events findes ogs\xe5 p\xe5 vores facebook side. I bunden af siden finder du en liste over de events der afholdes \xe5rligt samt tidspunkter for disse events."),r.a.createElement("div",{style:{height:700}},r.a.createElement(p,{events:t})),r.a.createElement("div",{className:"events"},r.a.createElement("h2",null,"\xc5rlige events"),r.a.createElement("div",{className:"events__grid"},k.map((function(e){return r.a.createElement(E,{name:e.name,description:e.description,quarter:e.quarter})})))))}function h(e){return{description:e.description,end:new Date(e.end_time),id:e.id,location:e.place.name,name:e.name,start:new Date(e.start_time),allday:!1}}function A(){return r.a.createElement("div",{className:"footer"},"\xa9 Datalogisk Studenterforening p\xe5 Aarhus Universitet -"," ",Date().split(" ")[3])}var _=t(63);function D(e){return r.a.createElement("div",{className:"member"},e.image?r.a.createElement("div",{className:"member__image",style:{backgroundImage:"url(/images/"+e.image+")"}}):"",e.name?r.a.createElement("p",{className:"member__name"},e.name):"",e.title?r.a.createElement("p",{className:"member__title"},e.title):"",e.class?r.a.createElement("p",{className:"member__class"},"\xc5rgang ",e.class):"",e.email?r.a.createElement("a",{className:"member__email",href:"mailto:"+e.email},e.email):"")}function N(){return r.a.createElement("div",{className:"board"},r.a.createElement("h1",null,"Bestyrelsen"),r.a.createElement("p",null,"Bestyrelsen best\xe5r af et udvalg af studerende fra diverse \xe5rgange p\xe5 datalogi studiet p\xe5 Aarhus Universitet.",r.a.createElement("br",null)," Se alle medlemmer herunder"),r.a.createElement("div",{className:"board__grid"},_.map((function(e){return r.a.createElement(D,{key:e.name,name:e.name,image:e.image,title:e.title,email:e.email,class:e.class})}))))}function y(){return r.a.createElement("div",{className:"contact"},r.a.createElement("h1",{className:"contact__header"},"Kontakt os"),r.a.createElement("div",{className:"contact__content"},r.a.createElement("p",null,"Vi kan kontaktes p\xe5 vores mailadresse eller via vores"," ",r.a.createElement("a",{href:"https://www.facebook.com/DSAUdk/"},"Facebookside"),"."),r.a.createElement("address",null,r.a.createElement("div",null,r.a.createElement("b",null,"Adresse: "),"\xc5bogade 34, Ada 124 - 8200 Aarhus N"),r.a.createElement("div",null,r.a.createElement("b",null,"Mail: "),r.a.createElement(i.b,{to:"dsau@dsau.dk"},"dsau@dsau.dk")))))}function S(){return r.a.createElement("div",{className:"about"},r.a.createElement("h1",{className:"about__header"},"Om DSAU"),r.a.createElement("div",{className:"about__content"},r.a.createElement("p",null,r.a.createElement("b",null,"D"),"atalogisk ",r.a.createElement("b",null,"S"),"tudenterforening p\xe5 ",r.a.createElement("b",null,"A"),"arhus"," ",r.a.createElement("b",null,"U"),"niversitet er en studenterforening for datalogistuderende p\xe5 AU. Foreningens opgave er at formidle id\xe9er og forslag fra datalogistuderende til universitet, samt st\xe5 for aktiviterer af social- og faglig karakter."),r.a.createElement("div",{className:"about__links"},r.a.createElement("h3",null,"Links"),r.a.createElement("a",{href:"https://github.com/DatalogiskStudenterforeningAarhusUni/vedtaegter/blob/master/vedtaegter.pdf"},"Vedt\xe6gter"),r.a.createElement("a",{href:"https://github.com/DatalogiskStudenterforeningAarhusUni/Referater"},"Referater"))))}var j=function(){return r.a.createElement(i.a,{basename:"/"},r.a.createElement("nav",{className:"navigation"},r.a.createElement("div",{className:"navigation__content"},r.a.createElement(i.b,{to:"/"},r.a.createElement("img",{className:"navigation__logo",src:"/DSAU_logo.png",alt:"DSAU Logo"})),r.a.createElement("ul",{className:"navigation__list"},r.a.createElement("li",null,r.a.createElement(i.b,{to:"/"},"Events")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/bestyrelsen/"},"Bestyrelsen")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/om/"},"Om DSAU")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/kontakt/"},"Kontakt"))))),r.a.createElement("div",{className:"content"},r.a.createElement(m.a,{path:"/om/",component:S}),r.a.createElement(m.a,{path:"/kontakt/",component:y}),r.a.createElement(m.a,{path:"/bestyrelsen/",component:N}),r.a.createElement(m.a,{path:"/",exact:!0,component:b})),r.a.createElement(A,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[66,1,2]]]);
//# sourceMappingURL=main.fda74d4a.chunk.js.map