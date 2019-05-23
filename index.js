// Application div
const appDiv = "app";

let routes = {};
let templates = {};

let template = (name, templateFunction) => {
  return templates[name] = templateFunction;
};

let route = (path, template) => {
    if (typeof template == "function") {
      return routes[path] = template;
    }
    else if (typeof template == "string") {
      return routes[path] = templates[template];
    }
    else {
      return;
    }
};

// Register the templates.

template('homepage', () => {
    let myDiv = document.getElementById(appDiv);
    myDiv.innerHTML = "";
    const link1 = createDiv('view1', "<div><div class='jumbotron' style='background-color:#182c3a;color:white;';><h1>COMPANY NAME</h1><div><a href='#/newblock' class='btn btn-light' style='float:right;'>Add New Block</a></div></div><div class='container'><table class='table table-bordered table-hover'><thead><tr><th scope='col'>Block ID</th><th scope='col'>Color</th><th scope='col'>Quantity</th><th scope='col'></th></tr></thead><tbody><tr><th scope='row'>1001</th><td>Grey</td><td>20</td><td><button class='btn btn-success'>Edit</button></td></tr><tr><th scope='row'>1002</th><td>Blue</td><td>21</td><td><button class='btn btn-success'>Edit</button></td></tr><tr><th scope='row'>1003</th><td>Black</td><td>22</td><td><button class='btn btn-success'>Edit</button></td></tr><tr><th scope='row'>1004</th><td>Purple</td><td>22</td><td><button class='btn btn-success'>Edit</button></td></tr></tbody></table></div></div>");
    return myDiv.appendChild(link1);
});
template('newblock', () => {
    let myDiv = document.getElementById(appDiv);
    myDiv.innerHTML = "";
    const link2 = createDiv('view2', "<div><div class='jumbotron' style='background-color:#182c3a;color:white;';><h1>COMPANY NAME</h1></div><a href='#/'>Go to Homepage</a</div>");
    return myDiv.appendChild(link2);
});

// Define routes

route('/', 'homepage');
route('/newblock', 'newblock');

// Generate DOM
let createDiv = (id, xmlString) => {
    let d = document.createElement('div');
    d.id = id;
    d.innerHTML = xmlString;
    return d.firstChild;
};
// Helper function to create a link.
let createLink = (title, text, href) => {
    let a = document.createElement('a');
    let linkText = document.createTextNode(text);
    a.appendChild(linkText);
    a.title = title;
    a.href = href;
    return a;
};

// route response
let resolveRoute = (route) => {
    try {
     return routes[route];
    } catch (error) {
        throw new Error("The route is not defined");
    }
};
// router
let router = (evt) => {
    const url = window.location.hash.slice(1) || "/";
    const routeResolved = resolveRoute(url);
    routeResolved();
};
// route change
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
