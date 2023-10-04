import React from 'react';
import { staffs } from './TestStaff.js';



export default class RandomPictures extends React.Component {
    constructor(props) {
        super(props);

        this.staffs = staffs;
    }

    checkNumber(randomNumber, excludedNumbers) {
        let isAlready = false;

        if (excludedNumbers) {
            excludedNumbers.forEach(number => {
                if (randomNumber == number) {
                    isAlready = true
                }
            }
            )
        }
        return isAlready
    }

    randomNumber(excludedNumbers) {
        let randomNumber = Math.floor((Math.random() * staffs.length))

        if (this.checkNumber(randomNumber, excludedNumbers)) {
            randomNumber = Math.floor((Math.random() * staffs.length))
            while (this.checkNumber(randomNumber, excludedNumbers)) {
                randomNumber = Math.floor((Math.random() * staffs.length))
            }
        }

        return randomNumber
    }



    render() {
        let excludedNumbers = [];

        let random1 = this.randomNumber()
        excludedNumbers.push(random1)
        let random2 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random2)
        let random3 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random3)
        let random4 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random4)
        let random5 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random5)
        let random6 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random6)
        let random7 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random7)
        let random8 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random8)
        let random9 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random9)
        let random10 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random10)
        let random11 = this.randomNumber(excludedNumbers)
        excludedNumbers.push(random11)
        let random12 = this.randomNumber(excludedNumbers)

        return <React.Fragment>
            <div className="randomPicture"><img src={staffs[random1].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random2].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random3].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random4].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random5].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random6].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random7].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random8].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random9].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random10].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random11].picture} alt="Photo de profil" /></div>
            <div className="randomPicture"><img src={staffs[random12].picture} alt="Photo de profil" /></div>
        </React.Fragment >
    }
}