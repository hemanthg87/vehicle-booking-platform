# Vehicle Booking System

A web application for managing vehicle bookings, built with Flask and SQLAlchemy.

## Features

- User authentication (login/logout)
- Vehicle booking management
- Admin user initialization
- SQLite database (default, configurable)
- Modular code structure

## Project Structure

```
.
├── app.py              # Main application setup
├── forms.py            # WTForms definitions
├── generated-icon.png  # App icon
├── main.py             # (Entry point or additional logic)
├── make_zip.py         # Utility for zipping files
├── models.py           # SQLAlchemy models
├── pyproject.toml      # Project metadata and dependencies
├── README.md           # Project documentation
├── routes.py           # Route definitions and registration
├── utils.py            # Utility functions (e.g., admin initialization)
├── static/             # Static files (CSS, JS, images)
├── templates/          # Jinja2 HTML templates
└── ...
```

## Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd vehicle_booking
   ```

2. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
   Or, if using Poetry:
   ```sh
   poetry install
   ```

3. **Set environment variables (optional):**
   - `SESSION_SECRET`: Secret key for sessions (default: `dev-secret-key`)
   - `DATABASE_URL`: Database URI (default: `sqlite:///vehicle_booking.db`)

4. **Run the application:**
   ```sh
   python app.py
   ```

## Usage

- Access the app in your browser at `http://localhost:5000`
- Log in or register as a user
- Book vehicles and manage your bookings

## Development

- Database tables are created automatically on first run.
- Admin user is initialized via [`utils.initialize_admin`](utils.py).

## License

MIT License

---

*For more details, see the source code in each file.*
