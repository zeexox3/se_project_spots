# Spots

**Spots** is a profile and gallery interface built using semantic HTML and CSS.
The project displays a user profile, an editable profile button, and a photo gallery organized into responsive cards.  
It is designed to adapt smoothly across screen sizes while maintaining a clean look.

---

## Project Description

Spots recreates a personal profile page that includes:

- A profile section with an avatar, user name, user description, and interactive edit button.
- A "New Post" button for creating new content (not usable yet).
- A responsive grid of image cards, each containing:
  - A photo
  - A title
  - A like button with hover animation

The layout uses a flexible approach to ensure the interface looks polished on both desktop and small screens.  
This project is a part of the TripleTen curriculum, demonstrating a clean layout and smooth interface.

---

## Functionality Overview

### **Profile Section**

- Displays a large avatar image with rounded edges.
- Shows the user name and description.
- The **Edit Profile** button includes an icon and hover transitions.
- On smaller screens, the profile layout stacks vertically and centers automatically.

### **New Post Button**

- Highlighted button with hover effects.
- Expands to full width on mobile for improved UX.

### **Cards Gallery**

- Six image cards arranged in a responsive CSS grid.
- Titles use ellipsis when too long.
- Each card includes a like button with opacity-based hover interaction.
- Images automatically adjust size using `object-fit: cover`.

### **Footer Section**

- Displays centered copyright text.

---

## Techniques & Technologies Used

### **HTML**

- Semantic markup
- Clean BEM-structured class names
- Accessible alt text for all images

### **CSS**

- **Flexbox**  
  Used for layout alignment in profile section and card content.

- **CSS Grid**  
  Powers the photo gallery for responsive card arrangement.

- **Media Queries**  
  Provides mobile-optimized layout at `max-width: 634px`.

- **Transitions & Hover Effects**  
  Smooth UI interactions for buttons and icons.

- **Text Overflow Handling**

  - `text-overflow: ellipsis`
  - `nowrap` and `line-clamp` for long titles and names.

- **Responsive Sizing**
  Layout adapts to 288px mobile width and 413px desktop card width.

- **BEM Methodology**
  Ensures scalable, maintainable CSS.

### **Additional Tools**

- `normalize.css` for consistent browser defaults
- External `fonts.css` for Poppins integration
- Organized project structure with block folder imports

---

## Link to Project

- https://github.com/zeexox3/se_project_spots

---

## Project Pitch Video

- Check out [this video](https://drive.google.com/file/d/1Sp9WGDCjYeca0f89ZJ_rBxiFkpGd_CLk/view?usp=sharing), where I describe my project.
