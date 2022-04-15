import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from '../firebase';
import "./explore.css"
const Explore = () => {
    let systemnames = [];
    let select = document.getElementsByClassName("gallery__item"); //Will appear twice in the dropdown
    let systemlead = [];
    let systemdesc = [];
    let systemimg = [];
    function arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele != value;
        });
    }
    const s = query(collection(db, "Systems"))
    const unsubb = onSnapshot(s, (querySnapshot) => {
        const response = querySnapshot.docs.map(doc => doc.data());
        response.forEach(element => {
            var sysname = element.name;
            var syslead = element.systemlead;
            var sysdesc = element.description;
            var sysimg = element.ImageURL;
            systemnames.push(sysname);
            systemlead.push(syslead);
            systemdesc.push(sysdesc);
            systemimg.push(sysimg);
        });
        systemnames.forEach(item => {
            let parentnode = document.getElementById("div1"); //make the parent node
            let child = document.createElement("div"); //make the child
            child.classList = "gallery__item"; //give the child the class (gallery__item) is what's used in CSS to make it all work across the board
            let system = document.createElement("div"); //giving the child some content
            system.classList = "SystemTitle"; //making a class for the title of the systems
            let titletext = document.createTextNode(item);
            system.appendChild(titletext); //appending the text to a div
            let systemphoto = document.createElement("img"); //creating an image for each carousel.
            systemphoto.classList = "System_Photo";
            systemphoto.src = "utalogo.png" //just a placeholder for images that are specific to the system
            let systemdesc = document.createElement("div"); //making a div for the description for the systems
            systemdesc.classList = "System_Description";
            let desctext = document.createTextNode("text text text");
            systemdesc.appendChild(desctext); //appending the text to a div
            child.appendChild(system);
            child.appendChild(systemphoto);
            child.appendChild(systemdesc);
            parentnode.appendChild(child); // finally appending all the children nodes holding the content to the parent carousel card.
        });
    });



    document.addEventListener('DOMContentLoaded', function () {
        var stream = document.querySelector('.gallery__stream');
        var items = document.querySelectorAll('.gallery__item');

        var prev = document.querySelector('.gallery__prev');
        prev.addEventListener('click', function () {
            stream.insertBefore(items[items.length - 1], items[0]);
            items = document.querySelectorAll('.gallery__item');
        });

        var next = document.querySelector('.gallery__next');
        next.addEventListener('click', function () {
            stream.appendChild(items[0]);
            items = document.querySelectorAll('.gallery__item');
        });
    });

    return (
        <div className="testing">
            <div class="gallery">
                <div class="gallery__prev"></div>
                <div class="gallery__next"></div>
                <div class="gallery__stream" id="div1">
                    <div class="gallery__item">Welcome to the Explore Page</div>
                </div>
            </div>
        </div>
    )
}
export default Explore;