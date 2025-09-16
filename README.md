# Store – Mini Storefront

A small storefront application built with **Next.js (App Router)**, **Tailwind CSS**, and **Context API**.  
It fetches product data from the [FakeStore API](https://fakestoreapi.com/) and provides a simple shopping cart experience.  

---

##  How to Run the Project

### 

```bash
1. Clone the repository
git clone https://github.com/manojshrestha003/StoreFront.git
cd StoreFront

2. Install dependenciess
npm install

3. Run development server
npm run dev


App will be available at:
 http://localhost:3000


```
## Tech Stack

Framework: Next.js (App Router)

Styling: Tailwind CSS

State Management: React Context API

Data Source: FakeStore API


## Data Flow
Products are fetched from the FakeStore API (/products) on the homepage.

Displayed in a grid with image, title, price, category.

CartContext stores items in global state.

Navbar shows total cart count.

Clicking Add to Cart updates global state → cart page.


## Trade-offs / Known Issues
No backend 

Limited filtering – only category & sort implemented (no advanced filters).

API dependency – if FakeStore API is down, products won’t load.

Basic error handling – only shows error text for API failure.