// import { Component, Prop } from '@stencil/core';
import { Component, Prop } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';


@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {
  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;
  @Prop() thingOne: string;
  @Prop() thingTwo: string;

  componentDidLoad() {
    console.log("prof his stat", this.history)
    // this.thingOne = this.history.location.state.thingOne
    // this.thingTwo = this.history.location.state.thingTwo
  }
  render() {
    console.log("prof ", this.match, this.match.params.name)

    if (this.match && this.match.params.name) {
      return ([
        // <ion-page>
        <ion-header>
          <ion-toolbar color='primary'>
            <ion-title>Ionic PWA Toolkit</ion-title>
          </ion-toolbar>
        </ion-header>,

        <ion-content padding fullscreen>
          <p>
            Hello! My name is {this.match.params.name}.
            My name was passed in through a route param!
              And these are my friends, {this.thingOne} and {this.thingTwo}.
            </p>

        </ion-content>
        // </ion-page>
      ]);
    }
  }
}