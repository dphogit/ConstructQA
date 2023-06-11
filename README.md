# 👷‍♂️ ConstructQA

Question Answering System for NZ Building Code Regulations - UoA Part IV Research Project

## Getting Started

### Backend

Navigate to the `backend` directory:

```bash
cd backend
```

This project uses [`venv` to manage packages](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment). Use the `requirements.txt` file to install the relevant packages. Anything regarding packages and their respective commands  should be done using the activated virtual environment.

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

To run the backend server:
```bash
flask run
```