import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from '../firebase';
import "./explore.css"
const Explore = () => {
    const slider = document.querySelector(".items");
    const slides = document.querySelectorAll(".item");
    const button = document.querySelectorAll(".button");

    let current = Math.floor(Math.random()*slides.length);
    let prev = current > 0 ? current - 1 : slides.length - 1;
    let next = current < slides.length - 1 ? current + 1 : 0;

		for (let i = 0; i < button.length; i++) {
			button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
		}

		const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

		const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);

		const gotoNum = number => {
			current = number;
			prev = current - 1;
			next = current + 1;

			for (let i = 0; i < slides.length; i++) {
				slides[i].classList.remove("active");
				slides[i].classList.remove("prev");
				slides[i].classList.remove("next");
			}

			if (next == 5) {
				next = 0;
			}

			if (prev == -1) {
				prev = 4;
			}

			slides[current].classList.add("active");
			slides[prev].classList.add("prev");
			slides[next].classList.add("next");
		}
    return (
        <div class="items">
		<div class="item active">
			<img src="http://via.placeholder.com/500x500"/>
		</div>
		<div class=" item next">
			<img src="http://via.placeholder.com/500x500"/>
		</div>
		<div class="item">
			<img src="http://via.placeholder.com/500x500"/>
		</div>
		<div class="item">
			<img src="http://via.placeholder.com/500x500"/>
		</div>
		<div class="item prev">
			<img src="http://via.placeholder.com/500x500"/>
		</div>
		<div class="button-container">
			<div class="button"><i class="fas fa-angle-left"></i></div>
			<div class="button"><i class="fas fa-angle-right"></i></div>
		</div>
	</div>
    )
}
export default Explore;