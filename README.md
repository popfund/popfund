# popfund

<img src="./popfund/src/client/components/purpMark.png" alt="drawing" width="150"/>

### Who We Are
popfund aims to alleviate mom and pop shop financial struggles through Covid-19. To do this, we will create a centralized platform where individuals can stimulate local businesses in a variety of ways, such as buying their products and services, donating to these businesses, or participating in bids thus helping them pay their employees. In doing so, the local community has the opportunity to help ensure the future of their favorite local businesses after the quarantine.

#### Team:
Dave Ho  
Rishab Jain  
Samuel Alsup  
Matthew Ruiz  

### Features
In our application, you can see our three main features. For starters, You can see a list of businesses close to you in our system when you first open up the home page. You can zoom in and out to see what other businesses are there. There is also a search bar, so you can search for a specific business. If you look at the top of the page, you will notice a dark orchid navigation bar that has the buttons: "Home", "Login", and "Signup". Using the "Home" button, you can return to the Business List page. Using the "Login" button, you can login to our system. Using the "Signup" button, you can create an account with us. On the home page, you can click on any of the business cards to direct you to more information about a business including what items they are selling during the pandemic, a link to their website, and how to donate to keep them open. Looking closer at the Item cards, they contain the item's name, a brief description, the price, and a button labeled "Buy Now" that lets you buy the item. The button will take you to a page where you could send a donation to them. 

### How to Run the Program locally:
1) Clone the entire repository, you can use ```git clone https://github.com/popfund/popfund.git popfund```
2) run the command ```cd popfund``` to get to the correct directory (at this point, if you ```ls``` you should see ```src``` and ```public``` subfolders listed)
3) After cloning, we'll want to ensure all npm packages are included. Run the following command to ensure this:  
```npm install --save```  
4) Run the command ```npm run dev```. This command should automatically open to localhost:3000 on your default browser. If it doesn't, look up localhost:3000 on your deafult browser.
5) Chrome or your browser may ask you for location permissions. This is used for our google-maps features displaying the local businesses. Please enable these permissions and refresh the browser.
6) Enjoy!

### How We Built It:
We used MongoDB Atlas as our database, Node JS and Express for REST APIs, and React on the front end side. We also used Material UI to help make our website look nicer.

&copy; popfund 2020
