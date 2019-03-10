import { Component, Prop, Listen } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { getTestValue, stall } from '../../shared/state';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;

  @Prop({ mutable: true }) stateValue: any;
  @Prop({ mutable: true }) fromChild: any;

  @Prop({ mutable: true }) menuOpen = "close"
  @Prop({ mutable: true }) activeTab = "home"
  @Prop({ mutable: true }) loading = false;
  @Prop({ mutable: true }) asyncEvent = false;

  @Listen('asyncEvent')
  asyncEventHander(event: CustomEvent) {
    console.log("async event", event)
    this.loading = event.detail;
  }
  @Listen('emitterTest')
  emitterTestHandler(event: CustomEvent) {
    console.log('Received the custom event: ', event.detail);
    this.fromChild = event.detail;
    stall(3000);
    this.activeTab = 'home'
  }
  @Listen('menuEvent')
  menuEventHandler(event: CustomEvent) {
    this.activeTab = event.detail;
    this.menuOpen = 'close'
  }

  async componentWillLoad() {
    console.log('home will load 1')
    await getTestValue()
      .then((temp) => {
        console.log('home will load 2', temp, 'hm');
        this.stateValue = temp;
      })
  }

  async handleTab(evt) {
    console.log(evt)
    // this.activeTab = (this.activeTab == evt.srcElement.id ? "open" : evt.srcElement.id)
  }

  async handleMenu(evt) {
    console.log("evt srcElement id", evt.srcElement.id)
    this.menuOpen = (this.menuOpen == evt.srcElement.id ? "close" : evt.srcElement.id)
    console.log("this. menuOpen", this.menuOpen)
  }

  render() {
    return ([
      // <ion-page>
      <ion-header>
        <ion-toolbar color='primary'>
          <div id="menu">
            <ion-button id="open" onClick={(event: UIEvent) => this.handleMenu(event)}>
              <ion-icon name="menu"></ion-icon>
            </ion-button>
          </div>
          <div id="appTitle">hiligaynon: {this.activeTab}</div>
        </ion-toolbar>
      </ion-header>,

      <ion-content fullscreen padding>

        <div class="modal" hidden={(this.menuOpen == "open" ? false : true)}>
          <zjn-menu hidden={(this.menuOpen == "open" ? false : true)}></zjn-menu>
        </div>

        <div id="loading" hidden={(this.loading ? false : true)}>
          <ion-img
            src="/assets/gif/loading-pink.gif"
            hidden={(this.loading ? false : true)}>
          </ion-img>
        </div>

        <h1 hidden={(this.activeTab == "home" ? false : true)}>Welcome</h1>
        {/* <p hidden={(this.fromChild ? false : true)}>This value is from a child component:</p> */}
        <h1 hidden={(this.activeTab == "home" ? false : true)}>{this.fromChild}</h1>

        <app-profile hidden={(this.activeTab == "profile" ? false : true)}></app-profile>

        <app-test hidden={(this.activeTab == "test" ? false : true)}></app-test>

        <zjn-child hidden={(this.activeTab == "child" ? false : true)}
          stateValue={this.stateValue}></zjn-child>

        <app-vocabulary hidden={(this.activeTab == "vocabulary" ? false : true)}>
        </app-vocabulary>

        <div class="footer">
          <div class="tab"><ion-button expand="block" color="light"><ion-icon name="list"></ion-icon></ion-button></div>
          <div class="tab"><ion-button expand="block" color="light"><ion-icon name="apps"></ion-icon></ion-button></div>
          <div class="tab"><ion-button expand="block" color="light"><ion-icon name="card"></ion-icon></ion-button></div>
        </div>

      </ion-content >
    ]);
  }
}

// openFirst() {
//   this.menu.enable(true, 'first');
//   this.menu.open('first');
// }


// console.log("main", this.history.push)
// console.log("main", this.history.location)
// console.log("main", this.history.location.pathname)
// console.log("main", this.history.location.state)
// console.log("main", this.history.location.query)
// console.log("main", this.history.location.hash)
// console.log("main", this.history.location.key)
// console.log("main", this.history.location.search)

// this.history.push("/profile/x", { dad: "money" });
// console.log("main", this.history)        {/* <ion-button id="profile" onClick={(event: UIEvent) => this.handleClick(event)}> */}


//========================
// async handleClick(evt) {
//   await setTestValue("set in home component - who do you love?")
//     .then(() => {
//       this.history.replace(evt.srcElement.id)
//     })
// }


{/* <ion-button id="profile" onClick={(event: UIEvent) => this.handleTab(event)}>
          Profile page
          </ion-button> */}


{/* <ion-button id="test" onClick={(event: UIEvent) => this.handleClick(event)}>
        <ion-button id="test" onClick={(event: UIEvent) => this.handleTab(event)}>
          Test page
          </ion-button> */}


{/* <ion-button id="child" onClick={(event: UIEvent) => this.handleTab(event)}>
          Child
          </ion-button> */}


{/* <ion-button id="open" onClick={(event: UIEvent) => this.handleMenu(event)}>
          Menu
          </ion-button> */}


{/* <div class="tab"><ion-icon name="apps"></ion-icon></div> */ }
{/* <div class="tab"><img src="assets/icon/_ionicons_svg_md-apps.svg"></img></div>
          <div class="tab"><ion-icon name="card"></ion-icon></div> */}
