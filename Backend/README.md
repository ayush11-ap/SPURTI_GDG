# SPURTI - A Decentralized Application

## API Endpoints

### POST /user/register

Registers a new user.

**Request Body:**

- `name` (string): The name of the user.
- `email` (string): The email of the user.
- `password` (string): The password of the user.
- `mobileNo` (string): The mobile number of the user.
- `role` (string): The role of the user.
- `address` (string): The address of the user.
- `roleDetails` (object): Additional details based on the user's role.

**Responses:**

- `200 OK`: User Created Successfully
- `400 Bad Request`: Error While Saving the user : {error message}

**Postman Example:**

```json
{
  "name": "Ayush Pawar",
  "email": "ayush@gmail.com",
  "password": "Password@123",
  "mobileNo": "1234567890",
  "address": "123 Main St",
  "role": "NGO",
  "roleDetails": {
    "ngoName": "Helping Hands",
    "ngoDescription": "We provide education to underprivileged children.",
    "workField": "Education & Welfare"
  }
}
```

### POST /user/login

Logs in a user.

**Request Body:**

- `email` (string): The email of the user.
- `password` (string): The password of the user.

**Responses:**

- `200 OK`: User Logged In Successfully!
- `400 Bad Request`: Error while saving the user : {error message}

**Postman Example:**

```json
{
  "email": "ayush@gmail.com",
  "password": "Password@123"
}
```

### GET /user/profile

Fetches the profile of the logged-in user.

**Headers:**

- `Cookie`: Include the `token` cookie received during login.

**Responses:**

- `200 OK`: Returns the user's profile.
- `401 Unauthorized`: Error in Authentication : {error message}

**Postman Example:**

No request body required. Ensure the `token` cookie is set in the request headers.

### POST /user/logout

Logs out a user.

**Responses:**

- `200 OK`: User Logged Out Successfully!

**Postman Example:**

No request body required.

## Problems

### POST /problem/submit

Submits a new problem.

**Request Body:**

- `title` (string): Title of the problem.
- `description` (string): Detailed description of the problem.
- `category` (string): Category of the problem (e.g., education, healthcare).
- `images` (array of strings): URLs of images related to the problem.
- `videos` (array of strings): URLs of videos related to the problem.
- `votes` (number): Initial votes for the problem.
- `address` (string): Address where the problem is located.

**Headers:**

- `Authorization`: Bearer token of the logged-in user.

**Responses:**

- `201 Created`: Problem submitted successfully.
- `500 Internal Server Error`: Error submitting problem: {error message}

**Postman Example:**

```json
{
  "title": "Broken Streetlights",
  "description": "The streetlights on Main Street have been broken for weeks.",
  "category": "infrastructure",
  "images": ["https://example.com/image1.jpg"],
  "videos": ["https://example.com/video1.mp4"],
  "votes": 10,
  "address": "123 Main St, Springfield"
}
```

### GET /problem/allProblems

Fetches all verified and approved problems.

**Headers:**

- `Authorization`: Bearer token of the logged-in user.

**Responses:**

- `200 OK`: Returns a list of problems.
- `500 Internal Server Error`: Error fetching problems: {error message}

**Postman Example:**

No request body required.

### GET /problem/aiAnalysis

Performs AI analysis on verified and approved problems.

**Headers:**

- `Authorization`: Bearer token of the logged-in user.

**Responses:**

- `200 OK`: Returns processed problems and AI-generated report.
- `500 Internal Server Error`: Error fetching problems: {error message}

**Postman Example:**

No request body required.

## Verify

### GET /verify/allProblems

Fetches all problems for verification.

**Headers:**

- `Authorization`: Bearer token of the logged-in user.

**Responses:**

- `200 OK`: Returns a list of problems for verification.
- `403 Forbidden`: Access denied.
- `500 Internal Server Error`: Error fetching problems: {error message}

**Postman Example:**

No request body required.

---

### PUT /verify/updateStatus

Updates the verification status of a problem.

**Headers:**

- `Authorization`: Bearer token of the logged-in user.

**Request Body:**

- `problemId` (string): The ID of the problem to update.
- `status` (string): The new status of the problem (`approved` or `rejected`).

**Responses:**

- `200 OK`: Problem status updated successfully.
- `400 Bad Request`: Invalid status value.
- `403 Forbidden`: Access denied.
- `404 Not Found`: Problem not found.
- `500 Internal Server Error`: Error updating problem status: {error message}

**Postman Example:**

```json
{
  "problemId": "64f7c8e2b9d1a2b3c4d5e6f7",
  "status": "approved"
}
```
