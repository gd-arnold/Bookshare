import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let bars = document.querySelectorAll('.bar');
    let arrayBars = Array.from(bars);

    arrayBars.forEach(bar => {
      bar.addEventListener('click', () => {
        bar.className = "col-4 bar border-right h5"
        let divsId = bar.textContent;

        //document.querySelector(`#${divsId}`).style.display = 'none';

        let div = document.querySelector(`#${divsId}`)
        div.style.display = 'block';

        let divMenus = document.querySelectorAll('.div-menu')
        let arrayDivMenus = Array.from(divMenus);

        arrayDivMenus.forEach(divMenu => {
          if (divMenu !== div) {
            divMenu.style.display = 'none';
          }
        });

        arrayBars.forEach(otherBars => {
          if (bar !== otherBars) {
            otherBars.className = "col-4 bar border-right h5 border-bottom"
          }
        })

      })
    });
  }

}
