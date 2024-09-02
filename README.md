# HealthConnect

**HealthConnect** is a healthcare management application designed to simplify the process of booking and managing appointments between patients and hospitals. The application features secure user authentication for both patients and hospital admins, patient-centered appointment scheduling, and an intuitive interface to view available hospitals based on the patient's location.

## Features

- **User Authentication**: Secure login and registration for both patients and hospital admins, implemented using NextAuth.
- **Patient Appointment Booking**: Patients can book appointments with hospitals in their city, specifying their preferred date and time.
- **Hospital Management**: Hospitals can manage appointments by adjusting dates and times based on their availability.
- **Location-Based Hospital Listings**: Patients are shown hospitals based on their city, providing a tailored experience.
- **Data Validation**: Zod is used for type casting and data validation, ensuring data integrity across the application.
- **Data Security**: User data is securely handled using Prisma ORM and sensitive information is encrypted.

## Technologies Used

### Frontend

- **Next.js 14**: Server-side rendering and API routes for the frontend.
- **React**: UI development.
- **Axios**: HTTP client for API requests.

### Backend

- **Next.js API Routes**: API routes are used to handle backend logic.
- **Prisma**: ORM for database interactions.
- **Zod**: Data validation and type casting library.
- **NextAuth**: Authentication for patient and hospital login.

### Database

- **PostgreSQL**: Relational database used to store all application data.

## Getting Started

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Node package manager (comes with Node.js)
- **PostgreSQL**: [Set up PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository**:
```bash
   git clone https://github.com/raggettii/healthConnect.git
   cd healthconnect
```
2. **Install Dependencies**:
```bash
   npm install
```
3. **Set Up Environment Variables**:
```bash
  DATABASE_URL=postgresql://user:password@localhost:5432/healthconnect
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=your_nextauth_secret

```
4. **Set Up the Database**:
```bash
   npx prisma migrate dev
```
5. **Start the Development Server**:
```bash
   npm run dev
```
**Thank you for using HealthConnect. Happy Coding! 🚀**
