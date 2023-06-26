# 👷‍♂️ ConstructQA

Question Answering System for NZ Building Code Regulations - UoA Part IV Research Project

## 🎨 Frontend 

The frontend web application is built using:
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/docs/handbook/react.html) for app development
- [Vite](https://vitejs.dev/) for the build tool
- [Mantine](https://mantine.dev/) for the UI component library
- [Tanstack React Query](https://tanstack.com/query/latest/docs/react/overview) and [Axios](https://axios-http.com/) for external data management

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
- ML/NLP libraries such as `numpy`, `pandas`, `pytorch`, `transformers` etc.

### Installation

Navigate to the `backend` directory:

```bash
cd backend
```

This project uses [`venv` to manage packages](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment).

Create a virtual environment:

```bash
python -m venv venv
```

The second argument is the location to create the virtual environment. You can call it anything you like, just make sure
to use it consistently for the other steps. e.g. `py -m venv .env` will create the virtual environment in a folder called `.env`.

Activate the virtual environment:

```bash
# Windows
.\venv\Scripts\activate

# Unix/MacOS
source venv/bin/activate
```

Use the `requirements.txt` file to install the relevant packages. Anything regarding packages and their respective commands  should be done using the activated virtual environment.

```bash
python -m pip install -r requirements.txt
```

**Note:** Every time you install new packages (not the initial setup), make sure to update the `requirements.txt` file:

```bash
python -m pip freeze > requirements.txt
```

### Running the application

#### Vector Database - Qdrant

This project uses [Qdrant](https://qdrant.tech/) for it vector database to store embeddings. 

As per the Quickstart guide, the easiest way to run Qdrant is using [Docker](https://docs.docker.com/get-docker/) so make
sure you have that installed and setup.

To get Qdrant running on the command line:

Pull the Qdrant docker image:
```bash
docker pull qdrant/qdrant
```

Run a new container. Essentially what we do is:
- We serve up the Qdrant REST API on `localhost:6333`
- Store the data in the local `qdrant_storage` folder.
- Assign the container a name `ConstructQA` so we can easily reference it later
```bash
docker run -p 6333:6333 -v $(pwd)/qdrant_storage:/qdrant/storage --name ConstructQA qdrant/qdrant
```

To stop the container:
```bash
docker stop ConstructQA
```

For subsequent runs you just start this container:
```bash
docker start ConstructQA

# The above will run it in the background, to run it in the foreground use the interactive flag
docker stop -i ConstructQA
```

You can obviously also run the image using the Docker Desktop GUI if you prefer and have installed it using the same or your preferred settings.

There is a script to populate the Qdrant database with the relevant data. Once
you have the Qdrant container running, you can run the script:
```bash
python app/init_clauses.py
```

#### Server

To run the backend server (with auto restart on file changes)
```bash
flask run --debug
```

### Testing

The backend uses [pytest](https://docs.pytest.org) for testing. To run the tests:
```bash
python -m pytest
```
To get a list of the functions tested rather than the dots use the verbose flag
```bash
python -m pytest -v
```

To measure the code coverage of the tests:
```bash
python -m coverage run -m pytest
```

This generates a `.coverage` file. When you have this you can view the report in the terminal:
```bash
python -m coverage report
```

You can also alternatively view the report data in HTML:
```bash
python -m coverage html
```

Then open the `htmlcov/index.html` file.

### Jupyter Notebooks

This project uses [Jupyter](https://jupyter.org/) to document scripts, experiments etc. when you want 
step-by-step execution of code. It can be run with the help of your IDE (PyCharm, VSCode etc.) or on the browser.

To run JupyterLab on the browser:
```bash
jupyter notebook
```
