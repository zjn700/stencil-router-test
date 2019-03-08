import { of, Observable } from 'rxjs';


export var var1: string = 'a';
export var var2: string = 'b';
// export var authUser: any = { displayName: "null" }
export var authUser: any = null
export var testValue: any = "blah"

export async function setTestValue(newValue) {
    // await stall()
    testValue = newValue
    // setTimeout(() => {
    //     console.log("waiting.....");
    //     testValue = newValue;
    //     console.log(testValue);
    // }, 5000)
}

export async function getTestValue() {
    await stall(500)
    return testValue
}

export async function stall(stallTime = 3000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}

export function setTestValueO(newValue) {
    setTimeout(() => {
        console.log("waiting.....");
        testValue = newValue;
        console.log(testValue);
        of
    }, 3000)
}
export function getTestValueO(): Observable<any> {
    return of(testValue)
}



export function setAuthUser(user) {
    authUser = user
}

export function getAuthUser(source) {
    console.log("from: ", source)
    let authUserObj: any;
    if (authUser) {
        authUserObj = { loggedIn: true, details: authUser }
    } else {
        authUserObj = { loggedIn: false, details: { displayName: "Please log in", photoURL: "/assets/icon/icon.png" } }
    }
    return authUserObj
}