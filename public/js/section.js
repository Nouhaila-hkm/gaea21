'use strict';

//import React from 'react';
const { Component } = React;
const { render } = ReactDOM;
const e = React.createElement;
const { matrerialize } = 'materialize-css/dist/css/materialize.min.css';
const { m } = "materialize-css/dist/js/materialize.min.js";

const ShowSection = '../../assets/js/components/createforms/ShowSection';


class LikeButton extends React.Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        $("#formulaire").submit(function (e) {
            e.preventDefault();

            /* // var liste = document.getElementById('Cible').innerHTML;
             var liste = document.getElementsByName('menu1');
             var chosenField = new Array();
             var typeName = new Array();
             console.log(liste)
             for (var i = 0; i < liste.length; i++) {
 
                 // liste[i].tagName,
                 // liste[i].name,
                 // liste[i].className,
                 //liste[i].value, 
                 chosenField[i] = liste[i].tagName
                 typeName[i] = liste[i].type
                  console.log(typeName)
 
             }*/

            let elem = document.querySelectorAll(".drop-down");
            var option = new Array();
            for (let i = 0; i < elem.length; i++) {
                option[i] = elem[i].innerHTML;
            }



            var chosenField = document.getElementById('menu1').tagName;
            var typeName = document.getElementById('menu1').type;

            var placeholder = document.getElementById('placeholder').value;
            var label = document.getElementById("label").value
            // console.log(label)
            // console.log(typeName)
            // console.log(placeholder)
            //  console.log(option)
            var data = {
                chosenField: chosenField,
                typeName: typeName,
                label: label,
                placeholder: placeholder,
                option: option
            }

            // console.log(data)

            $.ajax({
                url: '/Add',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                async: true,
                success: function (reponse) {
                    console.log(reponse);
                },
                error: function () {
                    alert('Ajax request failed.');
                }
            });
            // })
        })
    }
    i = 1;
    AddInput(Contenu) {
        var i = 1;
        /*   var Contenu = document.getElementById('Cible').innerHTML;
           Contenu = Contenu +
               '<label>Label </label> <br/> <input type=\"text\"/ name=\"section\"><br/>';
     
           document.getElementById('Cible').innerHTML = Contenu;*/

        var select = document.getElementById("addType");
        var type = select.options[select.selectedIndex].value;
        var label = document.getElementById("label").value;
        var placeholder = document.getElementById("placeholder").value;
        // console.log(type);
        var contenu = document.getElementById("Cible");


        var newlabel = document.createElement("label");
        var input = document.createElement("input");
        input.setAttribute('name', 'menu' + i);
        input.setAttribute('type', type);
        input.setAttribute('placeholder', placeholder)
        // labell.setAttribute('value', label);
        input.setAttribute('id', 'menu' + i);
        newlabel.innerHTML = label;
        contenu.append(newlabel);
        contenu.appendChild(input);

    }



    AddSelect(form) {

        //console.log($("#valeur").val())
        var length = document.formulaire.liste.length;
        //  console.log(document.formulaire.liste.length)
        document.formulaire.liste[length] = new Option($("#libelle").val(), $("#valeur").val());
        //form.liste.options[form.liste.options.length] = o;
        // var instances = M.FormSelect.init(elems, options);
        // console.log(document.formulaire.liste)
    }

    supprimer() {
        //  console.log(formulaire.liste.selectedIndex)
        if (formulaire.liste.selectedIndex >= 0) {
            formulaire.liste[formulaire.liste.selectedIndex] = null;
        } else {
            alert("Suppression impossible : aucune ligne sélectionnée");
        }
    }


    SupprimerTout() {
        formulaire.liste.length = 0;
    }

    creatCheck(prod) {
        var i = 1;
        if ($("#prod").val() !== '') {

            var chk = document.createElement('input');
            chk.setAttribute('type', 'checkbox');
            chk.setAttribute('id', 'menu' + i);
            chk.setAttribute('name', 'products');
            chk.setAttribute('className', 'filled-in');//class="filled-in" checked="checked"

            var span = document.createElement('span');
            span.setAttribute('for', 'menu' + i);
            span.appendChild(document.createTextNode($("#prod").val()));

            var p = document.createElement('p');

            Cible.appendChild(p);
            Cible.appendChild(chk);
            Cible.appendChild(span);

            prod.value = '';
            //console.log($("#prod").id)
            document.getElementById("chekbox");
            i = i + 1;
        }

    }

    creatRadio(prod) {
        var i = 1;
        if ($("#radio").val() !== '') {
            //console.log($("#radio").val())
            var p = document.createElement('p');
            var chk = document.createElement('input');
            var span = document.createElement('span');

            chk.setAttribute('type', 'radio');
            chk.setAttribute('id', 'menu' + i);
            chk.setAttribute('name', 'menu' + i);
            span.setAttribute('class', 'drop-down')
            // chk.setAttribute('class', "with-gap");//class="filled-in" checked="checked"

            //label.setAttribute('for', 'radioName' + i);

            span.appendChild(document.createTextNode($("#radio").val()));
            span.setAttribute("for", 'menu' + i)

            Cible.appendChild(p);
            Cible.appendChild(chk);
            Cible.appendChild(span)

            prod.value = '';
            //console.log($("#prod").id)
            document.getElementById("radioType");
            i = i + 1;
        }

    }

    DeleteAll() {
        // document.getElementById('All').remove(All);
        document.getElementById("Cible").innerHTML = "";
        //  div.parentNode.removeChild(div)
    }


    render() {
        return (
            <div>
                <form name="formulaire" method="post" id="formulaire">
                    <div className="row">
                        <div className="col s3">
                            <input type="button" value="Ajouter input" id="input" name='ajout' onClick={this.AddInput} />
                            <input type="text" id="label" placeholder="Label" />
                            <input type="text" id="placeholder" placeholder="Description" />
                            <select id="addType" className="browser-default">
                                <option valeur="text">text</option>
                                <option valeur="password">password</option>
                                <option valeur="url">url</option>
                                <option valeur="file">file</option>
                                <option valeur="button">button</option>
                                <option valeur="reset">reset</option>
                                <option valeur="submit">submit</option>
                            </select>
                        </div>

                        <div className="col s3">
                            <input type={"button"} name="prod" id="chekbox" value={"Ajouter checkbox"} onClick={(prod) => this.creatCheck(prod)} />
                            <input type={"text"} id="prod" />
                        </div>

                        <div className="col s3">
                            <input type={"button"} name="radio" id="radioType" value={"Ajouter button radio"} onClick={(radio) => this.creatRadio(radio)} />
                            <input type={"text"} id="radio" />
                        </div>

                        <div className="col s3">
                            <input type="button" value="Ajouter menu déroulante" id="select" onClick={(form) => { this.AddSelect(form) }} /><br />
                            <label>label</label>
                            <input type="text" id="libelle" name="libelle" size="15 " defaultValue={"texte"} />
                            <label>Valeur</label>
                            <input type="text" id="form" name="valeur" size="15" defaultValue={"texte"} />

                            <div>
                                <select align=" top" id="liste" name="liste" size="3" className="browser-default">
                                    <option value="Initiale" > Ligne initiale </option>
                                </select >
                                <input type="button" value="Supprimer la sélection" onClick={this.supprimer} />
                                <input type="button" value="Supprimer tout" onClick={this.SupprimerTout} />
                            </div>

                        </div>
                        <div>
                            <div id="Cible" name="Cible"></div> <br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s9 offset-s9">
                            <input type="submit" name="submit" value="Valider" />
                            <input type="button" value="supprimer une section" onClick={this.DeleteAll} />
                        </div>
                    </div>
                </form >
            </div >
        );
    }
}
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton />,domContainer);
