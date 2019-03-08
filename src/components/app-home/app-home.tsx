
import { Component, Prop, Listen } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import { getTestValue, setTestValue, stall } from '../../shared/state';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;
  @Prop({ mutable: true }) stateValue
  @Prop({ mutable: true }) fromChild
  @Prop({ mutable: true }) menuOpen = "close"
  @Prop({ mutable: true }) activeTab = "main"

  // @Prop() menu = document.querySelector('ion-menu-controller');

  @Prop() section: any = "home"


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

  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }

  async componentWillLoad() {
    console.log('home will load 1')

    await getTestValue()
      .then((temp) => {
        console.log('main will load 2', temp, 'hm');
        this.stateValue = temp;
      })
  }

  async handleTab(evt) {
    this.activeTab = (this.activeTab == evt.srcElement.id ? "open" : evt.srcElement.id)
  }

  async handleMenu(evt) {
    console.log("evt", evt.srcElement.id)
    this.menuOpen = (this.menuOpen == evt.srcElement.id ? "close" : evt.srcElement.id)
  }

  async handleClick(evt) {
    await setTestValue("set in home component - who do you love?")
      .then(() => {
        this.history.replace(evt.srcElement.id)
      })
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
          <div id="appTitle"> <ion-title>Ionic PWA Toolkit</ion-title></div>


          {/* <ion-menu side="start" menu-id="first">
            <ion-content>
              <ion-list>
                <ion-item>Menu Item</ion-item>
                <ion-item>Menu Item</ion-item>
                <ion-item>Menu Item</ion-item>
              </ion-list>
            </ion-content>
            <ion-menu-controller></ion-menu-controller>

          </ion-menu> */}


        </ion-toolbar>
      </ion-header>,

      <ion-content fullscreen padding>
        <div class="modal" hidden={(this.menuOpen == "open" ? false : true)}>
          <zjn-menu hidden={(this.menuOpen == "open" ? false : true)}></zjn-menu>
        </div>

        <p>
          Welcome to the Ionic PWA Toolkit.
        </p>
        {/* <p>This value is from the zjn-child component: {this.fromChild}</p> */}

        <p hidden={(this.fromChild ? false : true)}>This value is from the zjn-child component:</p>
        <h1>{this.fromChild}</h1>

        {/* <ion-button id="profile" onClick={(event: UIEvent) => this.handleClick(event)}> */}
        {/* <ion-button id="profile" onClick={(event: UIEvent) => this.handleTab(event)}>
          Profile page
          </ion-button> */}
        <app-profile hidden={(this.activeTab == "profile" ? false : true)}></app-profile>

        {/* <ion-button id="test" onClick={(event: UIEvent) => this.handleClick(event)}>
        <ion-button id="test" onClick={(event: UIEvent) => this.handleTab(event)}>
          Test page
          </ion-button> */}
        <app-test hidden={(this.activeTab == "test" ? false : true)}></app-test>

        {/* <ion-button id="child" onClick={(event: UIEvent) => this.handleTab(event)}>
          Child
          </ion-button> */}
        <zjn-child hidden={(this.activeTab == "child" ? false : true)}
          stateValue={this.stateValue}></zjn-child>

        {/* <ion-button id="open" onClick={(event: UIEvent) => this.handleMenu(event)}>
          Menu
          </ion-button> */}


        {/* <zjn-menu hidden={(this.menuOpen == "open" ? false : true)}></zjn-menu> */}

      </ion-content >

    ]
      // </ion-page>
    );
  }
}

    // console.log("main", this.history.push)
    // console.log("main", this.history.location)
    // console.log("main", this.history.location.pathname)
    // console.log("main", this.history.location.state)
    // console.log("main", this.history.location.query)
    // console.log("main", this.history.location.hash)
    // console.log("main", this.history.location.key)
    // console.log("main", this.history.location.search)

    // this.history.push("/profile/x", { dad: "money" });
    // console.log("main", this.history)