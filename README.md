# 👷‍♂️ ConstructQA

Question Answering System for NZ Building Code Regulations - UoA Part IV Research Project

## 🎨 Frontend 

The frontend web application is built using:
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/docs/handbook/react.html) for app development
- [Vite](https://vitejs.dev/) for the build tool
- [Mantine](https://mantine.dev/) for the UI component library
- [Tanstack React Query](https://tanstack.com/query/latest/docs/react/overview) for data fetching

The frontend follows the practices of the [Bulletproof-React Guide](https://github.com/alan2207/bulletproof-react/tree/master)
so please briefly familiarise with it regarding the project structure and best practices.

### Installation and Setup

Navigate to the `webapp` directory:

```bash
cd webapp
```

Install dependencies:

```bash
npm install
```

Run the web application:
```bash
npm run dev
```

## 🔢 Backend

The backend server is built using:
- Flask for the web framework to develop the REST API
- TODO: Add relevant ML packages

### Installation and Setup

Navigate to the `backend` directory:

```bash
cd backend
```

This project uses [`venv` to manage packages](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment).
Use the `requirements.txt` file to install the relevant packages. Anything regarding packages and their respective commands  should be done using the activated virtual environment.

Create a virtual environment:

```bash
py -m venv venv
```
The second argument is the location to create the virtual environment. You can call it anything you like, just make sure
to use it consistently for the other steps. e.g. `py -m venv .env` will create the virtual environment in a folder called `.env`.

```bash
py -m pip install -r requirements.txt
```

Activate the virtual environment:

```bash
# Windows
.\venv\Scripts\activate

# Unix/MacOS
source venv/bin/activate
```

**Note:** Every time you install new packages (not the initial setup), make sure to update the `requirements.txt` file:

```bash
py -m pip freeze > requirements.txt
```

To run the backend server (with auto restart on file changes)
```bash
flask run --debug
```