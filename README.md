# teresol-web

## 🌟 Project Overview

The `teresol-web` project is a **robust and scalable web application** built using **Next.js, React, and TypeScript**. It serves as a comprehensive solution for managing job postings, handling user authentication, and serving static content, with a strong focus on modularity and a modern development stack.

## 🏛️ Architecture Overview

The application utilizes a full-stack JavaScript/TypeScript architecture with server-side rendering capabilities provided by Next.js.

### Key Technologies

| Category | Framework/Library | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **Next.js, React, TypeScript** | UI development, Server-Side Rendering (SSR), Static Site Generation (SSG). |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid and modular styling. |
| **Backend/API** | **Next.js API Routes, Express, NestJS (in parts)** | Handling server-side logic and API management. |
| **Database** | **MySQL** | Persistent data storage. |
| **Authentication** | **NextAuth.js** | Secure user authentication. |
| **Email Services** | **Nodemaile** | Sending transactional and contact form emails. |
| **Security** | **bcrypt** | Hashing user passwords. |
| **Deployment** | **Docker** | Containerization for consistent environments and orchestration for scaling. |
| **Animations/UI** | **framer-motion, gsap, lenis, react-parallax-tilt** | Smooth scrolling and advanced user interface animations. |
| **Utilities** | **date-fns, slugify, lucide-react, mime, mysql2** | Date manipulation, URL slug generation, icons, MIME type detection, and database interaction. |

---

## 🛠️ Setup & Installation

### Prerequisites

Ensure you have the following installed on your system:

* **Node.js** (v18 or later)
* **Docker**
* **MySQL**

### Steps to Set Up

1.  **Clone the Repository**

    ```bash
    git clone repo_name
    cd teresol-web
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**

    Create a file named `.env` in the project root directory and populate it with the required configuration:

    ```env
    DATABASE_URL=mysql://user:password@localhost:3306/teresol # Use your actual connection string
    SMTP_HOST=your_smtp_host
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_user
    SMTP_PASSWORD=your_smtp_password
    CONTACT_FORM_RECIPIENT=your_contact_email
    ```

4.  **Run with Docker (Recommended for complete environment)**

    This command will build the Docker image, set up the container, and link the application with the database service (if defined in `docker-compose.yml`).

    ```bash
    docker-compose up --build
    # The application will be accessible at http://localhost:80
    ```

5.  **Run the Development Server (Alternative)**

    To run the Next.js application only (assuming your database is running separately):

    ```bash
    npm run dev
    ```

---

## 🚀 Deployment Instructions

The project is configured for deployment using Docker and Kubernetes.

1.  **Build the Production Docker Image**

    ```bash
    docker build -t teresol-web .
    ```

2.  **Run the Docker Container**

    ```bash
    docker run -d -p 80:3000 --name teresol-web teresol-web
    ```
---


## 🐳 Docker Configuration

The project uses Docker for containerization to ensure a consistent development and production environment.

* **Dockerfile**: Specifies the base image, environment setup, dependencies installation, and application build steps for the Next.js application.
* **docker-compose.yml**: Defines multi-container application services, typically including:
    * The **`teresol-web`** application service (using the `Dockerfile`).
    * A **`db`** service (using the MySQL image).
    * Network configuration to allow the application to connect to the database using the `DATABASE_URL` environment variable.

---

## 🗄️ Database Schema (SQL `CREATE TABLE` Queries)

The application uses **MySQL**. The complete table creation queries are provided below for easy setup and reference.

### `SQL Tables`

```sql
-- 1. users Table (User Management)
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  role VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. jobs Table (Job Listings)
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  title TEXT,
  location TEXT,
  short_desc TEXT,
  full_description TEXT,
  department TEXT,
  job_type TEXT,
  experience_level TEXT,
  is_active TINYINT(1) DEFAULT 1 NOT NULL,
  closing_date DATE,
  is_internship TINYINT(1)
);

-- 3. blogs Table (Blog Content)
CREATE TABLE blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  title VARCHAR(255),
  short_desc TEXT,
  content TEXT,
  image_url TEXT,
  author VARCHAR(255),
  read_time VARCHAR(50),
  category VARCHAR(100),
  is_featured TINYINT(1) DEFAULT 0 NOT NULL,
  slug VARCHAR(255) UNIQUE
);

-- 4. settings Table (Application Configuration)
CREATE TABLE settings (
  setting_key VARCHAR(50) PRIMARY KEY,
  setting_value VARCHAR(255) NOT NULL,
  description VARCHAR(255)
);

-- 5. job_applications Table (Candidate Applications)
CREATE TABLE job_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(150),
  cv_filename VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50),
  is_internship TINYINT(1),
  internship_dept VARCHAR(50),
  father_spouse_name VARCHAR(255),
  field_of_interest VARCHAR(100),
  address VARCHAR(500),
  year_of_birth INT,
  any_medical_illness TEXT,
  shortlisted_elsewhere ENUM('Yes','No'),
  other_org_name VARCHAR(255),
  other_app_status VARCHAR(100),
  expected_salary VARCHAR(100),
  willing_to_travel ENUM('National','International','Both','No'),
  future_study_plans VARCHAR(255),
  earliest_join_date DATE,
  expected_stay_duration VARCHAR(100),
  heard_about_us VARCHAR(255),
  relative_at_teresol ENUM('Yes','No'),
  referral_name VARCHAR(255),
  referral_contact VARCHAR(20),
  professional_exp_years DECIMAL(4,2),
  current_company_name VARCHAR(255),
  current_designation VARCHAR(255),
  current_salary VARCHAR(100),
  tenure_last_job VARCHAR(100),
  reason_for_quitting TEXT,
  candidate_notes TEXT,
  -- Foreign Key for linking application to a job
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);



-- Businsess Overview
# teresol-web

## 🌟 Project Overview

The `teresol-web` project is a **robust and scalable web application** built using **Next.js, React, and TypeScript**. It serves as a comprehensive solution for managing job postings, handling user authentication, and serving static content, with a strong focus on modularity and a modern development stack.

## 🏛️ Architecture Overview

The application utilizes a full-stack JavaScript/TypeScript architecture with server-side rendering capabilities provided by Next.js.

### Key Technologies

| Category | Framework/Library | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **Next.js, React, TypeScript** | UI development, Server-Side Rendering (SSR), Static Site Generation (SSG). |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid and modular styling. |
| **Backend/API** | **Next.js API Routes, Express, NestJS (in parts)** | Handling server-side logic and API management. |
| **Database** | **MySQL** | Persistent data storage. |
| **Authentication** | **NextAuth.js** | Secure user authentication. |
| **Email Services** | **Nodemaile** | Sending transactional and contact form emails. |
| **Security** | **bcrypt** | Hashing user passwords. |
| **Deployment** | **Docker** | Containerization for consistent environments and orchestration for scaling. |
| **Animations/UI** | **framer-motion, gsap, lenis, react-parallax-tilt** | Smooth scrolling and advanced user interface animations. |
| **Utilities** | **date-fns, slugify, lucide-react, mime, mysql2** | Date manipulation, URL slug generation, icons, MIME type detection, and database interaction. |

---

## 🛠️ Setup & Installation

### Prerequisites

Ensure you have the following installed on your system:

* **Node.js** (v18 or later)
* **Docker**
* **MySQL**

### Steps to Set Up

1.  **Clone the Repository**

    ```bash
    git clone repo_name
    cd teresol-web
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**

    Create a file named `.env` in the project root directory and populate it with the required configuration:

    ```env
    DATABASE_URL=mysql://user:password@localhost:3306/teresol # Use your actual connection string
    SMTP_HOST=your_smtp_host
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_user
    SMTP_PASSWORD=your_smtp_password
    CONTACT_FORM_RECIPIENT=your_contact_email
    ```

4.  **Run with Docker (Recommended for complete environment)**

    This command will build the Docker image, set up the container, and link the application with the database service (if defined in `docker-compose.yml`).

    ```bash
    docker-compose up --build
    # The application will be accessible at http://localhost:80
    ```

5.  **Run the Development Server (Alternative)**

    To run the Next.js application only (assuming your database is running separately):

    ```bash
    npm run dev
    ```

---

## 🚀 Deployment Instructions

The project is configured for deployment using Docker and Kubernetes.

1.  **Build the Production Docker Image**

    ```bash
    docker build -t teresol-web .
    ```

2.  **Run the Docker Container**

    ```bash
    docker run -d -p 80:3000 --name teresol-web teresol-web
    ```
---

## 💻 Development Guidelines

| Area | Guideline | Tools/Reference |
| :--- | :--- | :--- |
| **Code Style** | Follow consistent style for readability and maintainability. | Airbnb JavaScript Style Guide |
| **Linting** | Use static analysis to catch errors and enforce style. | ESLint |
| **Testing** | Write unit tests for components and API routes. | Jest, React Testing Library |
| **Version Control** | Use Git for tracking changes and collaborative development. | Git, standard branching model |
| **Styling** | Use utility-first approach for responsive and scalable design. | Tailwind CSS |

---

## 🐳 Docker Configuration

The project uses Docker for containerization to ensure a consistent development and production environment.

* **Dockerfile**: Specifies the base image, environment setup, dependencies installation, and application build steps for the Next.js application.
* **docker-compose.yml**: Defines multi-container application services, typically including:
    * The **`teresol-web`** application service (using the `Dockerfile`).
    * A **`db`** service (using the MySQL image).
    * Network configuration to allow the application to connect to the database using the `DATABASE_URL` environment variable.

---

## 🗄️ Database Schema (SQL `CREATE TABLE` Queries)

The application uses **MySQL**. The complete table creation queries are provided below for easy setup and reference.

### `SQL Tables`

```sql
-- 1. users Table (User Management)
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  role VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. jobs Table (Job Listings)
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  title TEXT,
  location TEXT,
  short_desc TEXT,
  full_description TEXT,
  department TEXT,
  job_type TEXT,
  experience_level TEXT,
  is_active TINYINT(1) DEFAULT 1 NOT NULL,
  closing_date DATE,
  is_internship TINYINT(1)
);

-- 3. blogs Table (Blog Content)
CREATE TABLE blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  title VARCHAR(255),
  short_desc TEXT,
  content TEXT,
  image_url TEXT,
  author VARCHAR(255),
  read_time VARCHAR(50),
  category VARCHAR(100),
  is_featured TINYINT(1) DEFAULT 0 NOT NULL,
  slug VARCHAR(255) UNIQUE
);

-- 4. settings Table (Application Configuration)
CREATE TABLE settings (
  setting_key VARCHAR(50) PRIMARY KEY,
  setting_value VARCHAR(255) NOT NULL,
  description VARCHAR(255)
);

-- 5. job_applications Table (Candidate Applications)
CREATE TABLE job_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(150),
  cv_filename VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50),
  is_internship TINYINT(1),
  internship_dept VARCHAR(50),
  father_spouse_name VARCHAR(255),
  field_of_interest VARCHAR(100),
  address VARCHAR(500),
  year_of_birth INT,
  any_medical_illness TEXT,
  shortlisted_elsewhere ENUM('Yes','No'),
  other_org_name VARCHAR(255),
  other_app_status VARCHAR(100),
  expected_salary VARCHAR(100),
  willing_to_travel ENUM('National','International','Both','No'),
  future_study_plans VARCHAR(255),
  earliest_join_date DATE,
  expected_stay_duration VARCHAR(100),
  heard_about_us VARCHAR(255),
  relative_at_teresol ENUM('Yes','No'),
  referral_name VARCHAR(255),
  referral_contact VARCHAR(20),
  professional_exp_years DECIMAL(4,2),
  current_company_name VARCHAR(255),
  current_designation VARCHAR(255),
  current_salary VARCHAR(100),
  tenure_last_job VARCHAR(100),
  reason_for_quitting TEXT,
  candidate_notes TEXT,
  -- Foreign Key for linking application to a job
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);



-- Teresol-web Business Overview

The project focuses on three core areas: Content, User Management, and Careers, complemented by essential Marketing features.

🚀 Features Summary (In-Scope)

Core Functionalities

Content Management System (CMS):

Create, edit, and delete blog posts and job listings.

Upload and manage images and other media (media management).

User & Access Control:

Secure login and registration for Admins.

Role-based access control for content and application management.

Job Application System:

Job Seekers can browse openings and submit detailed applications.

Administrators can manage applications (review status, communication).

Admin Dashboard:

Provides an overview of key metrics and analytics.

Management interface for users, roles, permissions, and applications.

Marketing & Business Features (Frontend Display)

These features are dedicated to showcasing Teresol's business profile and offerings:

Services & Products: Dedicated sections to detail embedded systems and enterprise software solutions.

Portfolio Showcase: Display of completed projects and success stories.

Client Testimonials: Management and display of key client relationships.

Compliance & Certifications: Pages dedicated to listing regulatory compliance and technical certifications.

Leadership Profiles: Content management for displaying executive and leadership team profiles.

Non-Functional Targets

Category

Target Metric

Performance

Average page load time under 3 seconds. Backend capacity for 1000+ requests per second.

Scalability

Supports horizontal scaling of the backend environment.

Usability & SEO

Fully responsive design on all devices. Implements SEO optimization (dynamic metadata, structured data).