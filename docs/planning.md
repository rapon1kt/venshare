# Roadmap

The list below will dictate the order of the development stages to be completed, moving from requirements to implementation.

## Requirements

Features to be implemented in the application. These features are either system-specific (unique requirements such as performance and business rules) or user-specific (functionalities directly linked to user interaction).

### System Requirements

- **Performance:** Pages must load in under 2 seconds to ensure a good user experience and favor search engine rankings.
- **SEO:** Support for Server-Side Rendering (SSR) or Static Site Generation (SSG) to allow dynamic meta tags, open-graph integration, and proper indexing.
- **Security:** Passwords must be hashed (e.g., bcrypt/Argon2) before storage. API endpoints must be protected against CSRF, XSS, and SQL Injection attacks. Rate limiting applied to authentication routes.
- **Asset Management:** Images and media must be compressed and stored in a scalable cloud storage bucket (e.g., AWS S3, Cloudinary) rather than the local file system.
- **Data Reliability:** Automated daily backups of the database to prevent data loss.

### Client Requirements

**1. User**

- Users must be able to authenticate (Register, Login, Logout, and Password Recovery).
- Users must be able to see their profile.
- Users must be able to edit their information:
  - Change name;
  - Change password;
  - Verify email;
  - Upload a profile picture.

**2. Post**

- Users must be able to create and delete posts.
- Users must be able to update a post:
  - Change text content (via a Markdown or Rich Text Editor);
  - Change post visibility (Draft, Published, Unlisted);
  - Add or change a cover image.
- Posts must automatically generate a URL-friendly slug based on the title.
- Posts must display an estimated "read time" and the publication date.

**3. Categorization & Tags**

- Authors must be able to create, edit, and delete categories.
- Authors must be able to assign multiple tags and a primary category to a post.

**4. Search & Navigation**

- Readers must be able to search for posts using keywords in the title or content.
- Readers must be able to filter posts by specific tags, categories, or authors.
- The blog feed must support pagination or infinite scrolling for performance.

**5. Comments (Optional/Phase 2)**

- Authenticated users must be able to leave comments on published posts.
- Authors must be able to moderate (delete/hide) comments on their respective posts.

## Implementation Stages

This section outlines the chronological order of development, starting from the core foundation (MVP) and moving towards advanced features.

### 1. MVP

_Goal: A functional blog where a single author can publish articles and readers can view them._

1.  **Project Setup & Database Design:** Initialize the repository, setup the database schema (Users, Posts).
2.  **Basic Authentication:** Implement User Registration, Login, and Logout.
3.  **Post CRUD (Backend):** Create API endpoints for creating, reading, updating, and deleting posts.
4.  **Content Parsing:** Implement Markdown or Rich Text parsing for post content and automatic slug generation.
5.  **Basic Frontend (Feed & Post Page):** Develop the UI to display the list of published posts and the individual post reading page.
6.  **Draft/Publish Toggle:** Implement post visibility states.

### 2. Organization & Discoverability

_Goal: Make the content easier to find, navigate, and index._

1.  **Categories & Tags:** Add database models and UI for creating and assigning tags/categories to posts.
2.  **Search & Filters:** Implement keyword search functionality and filtering by tags/categories.
3.  **Pagination:** Add pagination or infinite scroll to the blog feed to handle a growing number of posts.
4.  **SEO & Metadata:** Implement dynamic meta tags, SSR/SSG for search engine indexing, and Open Graph tags for social sharing.
5.  **Media Uploads (Basic):** Integrate cloud storage (e.g., AWS S3) for post cover images.

### 3. Community & Polish

_Goal: Increase user engagement, security, and administrative control._

1.  **User Profiles:** Allow users to upload profile pictures and update their personal information.
2.  **Roles & Authorization:** Implement middleware to differentiate between Admins, Authors, and standard Readers.
3.  **Comments System:** Allow authenticated users to comment on posts, and authors to moderate them.
4.  **Advanced Security:** Implement rate limiting, password recovery flows (Email verification & Reset), and automated database backups.
5.  **Performance Optimization:** Implement caching (e.g., Redis) for frequently accessed posts and asset compression.
