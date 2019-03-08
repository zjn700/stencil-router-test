// import '@ionic/core';
import '@stencil/core';
import { Component } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class MyApp {

  render() {
    return (
      <ion-app>
        <main>
          <stencil-router>
            <stencil-route url='/' component='app-home' exact={true}>
            </stencil-route>

            {/* <stencil-route url='/' component='app-home'>
            </stencil-route> */}

            {/* <stencil-route url='/home' component='app-home'>
            </stencil-route> */}

            <stencil-route url='/test' component='app-test'>
            </stencil-route>

            {/* <stencil-route url='/home/:section' component='app-home'>
            </stencil-route> */}

            <stencil-route url='/profile/:name' component='app-profile'>
            </stencil-route>

            {/* <stencil-route component="app-home" /> */}

          </stencil-router>
        </main>
      </ion-app>
    );
  }
}