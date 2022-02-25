import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { delay, filter } from 'rxjs';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [CustomValidators.addition('answer', 'a', 'b')]
  )

  get a() {
    return this.mathForm.value.a
  }

  get b() {
    return this.mathForm.value.b
  }



  randomNumber() {
    return Math.floor(Math.random() * 10)
  }

  constructor() { }

  ngOnInit(): void {
    const startTime = new Date();
    let numberSolved = 0;

    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(500)
    )
      .subscribe(() => {

        numberSolved++

        this.secondsPerSolution = (
          new Date().getTime() - startTime.getTime()
        ) / numberSolved / 1000

        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: ''
        })

      })
  }

}
