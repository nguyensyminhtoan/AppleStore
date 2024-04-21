<h1>About The Project:</h1>
<h2>Apple Store Web</h2>

![image](https://github.com/nguyensyminhtoan/AppleStore/assets/126958335/4f7c696c-b443-4e84-8796-26652d8e1ef3)


<h2>Build with:</h1>

<ul>
    <li><img src="https://camo.githubusercontent.com/6c3957842901e5baa389f3bb8758c8966683333b28493013062fcab5fab645e7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642" alt="React" data-canonical-src="https://img.shields.io/badge/React-20232A?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB" style="max-width: 100%;"></li>
    <li><img src="https://nodejs.org/static/logos/nodejsLight.svg" width="80px"/></li>
</ul>

<h2>Functional description:</h2>

<ul>
    <li>Login/logout, user authentication using express-session</li>
    <li>(Client) Order function</li>
    <li>(Client) Send confirmation email when placing an order</li>
    <li>(Client) View placed orders</li>
    <li>(Admin) Decentralization</li>
    <li>(Admin) View list of products</li>
    <li>(Admin + Client) Livechat function between customers and Consultants</li>
    <li>(Admin) Admin Dashboard</li>
    <li>(Admin) Create a new product</li>
    <li>(Admin) Edit information or delete products</li>
    <li>(Admin) Product quantity management function</li>
</ul>

<h2>Demo link:</h2>

<p>It may take a minute or two to use because this is a free host</p>
<ul>
    <li>Client app: https://asm3-03wc.onrender.com/</li>
    <li>Admin app: https://admin-2axf.onrender.com/</li>
    <li>Backend: https://backendasm3.onrender.com</li>
</ul>

<h2>Deployment guide (on local):</h2>

<ul>
    <li>
        download
    </li>
    <li>
        Install NPM package on both frontend and backend : 
        <div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto"><pre data-sider-select-id="88c4d050-356b-43a5-ac5e-0693e7f8964c">npm install</pre><div class="zeroclipboard-container">
        <clipboard-copy aria-label="Copy" class="ClipboardButton btn btn-invisible js-clipboard-copy m-2 p-0 tooltipped-no-delay d-flex flex-justify-center flex-items-center" data-copy-feedback="Copied!" data-tooltip-direction="w" value="npm install" tabindex="0" role="button">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon">
        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check js-clipboard-check-icon color-fg-success d-none">
        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
</svg>
    
  </div></div>
    </li>
    <li>     
    Change all api links in admin and client frontend to http://localhost:5000/
    </li>
    <li>
        Start project: 
         <div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto"><pre data-sider-select-id="88c4d050-356b-43a5-ac5e-0693e7f8964c">npm start</pre><div class="zeroclipboard-container">
        <clipboard-copy aria-label="Copy" class="ClipboardButton btn btn-invisible js-clipboard-copy m-2 p-0 tooltipped-no-delay d-flex flex-justify-center flex-items-center" data-copy-feedback="Copied!" data-tooltip-direction="w" value="npm start" tabindex="0" role="button">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon">
        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check js-clipboard-check-icon color-fg-success d-none">
        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
</svg>
    </li>
</ul>
