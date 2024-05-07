import { cleanColumns, filterCaracters } from "../utils/string.js";

export function verifySyntax(command) {

    const commandParts = command.split(' ');
    const action = commandParts[0];

    switch (action.toUpperCase()) {

        case 'INIT':
            const databaseName = commandParts[1];
            const dbIsNumber = parseInt(databaseName);
            if (!isNaN(dbIsNumber)) {
                execError('Invalid database name -> ' + databaseName);
            }
            if (commandParts.length > 2) {
                execError('1 argument expected (database name) but got: ' + (commandParts.length - 1).toString());
            }
            return {command};

        // Esto se convertirá en NUE HEADERS
        case 'SAVE':

        const saveRegex = /^\s*SAVE\s*$/ui;

        if (!saveRegex.test(command)) {
            execError('Invalid format for finding command');
        }

        const saveMatch = command.match(saveRegex);

        return {command, commandMatch: saveMatch};

        case 'DROP':

            const dropElement = commandParts[1];

            if (commandParts.length < 2) {
                execError('Not enough arguments for the DROP command.');
            }

            if (commandParts.length > 3) {
                execError('2 arguments expected (database or table name) but got: ' + (commandParts.length - 1).toString());
            }

            switch (dropElement.toUpperCase()) {
                case 'DATABASE':
                case 'TABLE':
                    return {command};

                default:
                    execError('Element: ' + dropElement + ' does not support the DROP command.');
            }

        case 'CREATE':

        const createRegex = /^\s*CREATE\s+(DATABASE|TABLE)\s+(\w+)\s*(?:\((\w+\s*(?:as\s+PRIMARY_KEY\s*)?(?:,\s*\w+\s*(?:as\s+PRIMARY_KEY\s*)?)*\s*)\))?$/ui;

        if(!createRegex.test(command)) {
            execError('Invalid format for create command')
        }

        const createMatch = command.match(createRegex);

        return {command, commandMatch: createMatch};

        case 'INSERT':

            const regex = /INSERT\s+INTO\s+\w+\s*(?:\(([^()]+)\))?\s*(?:VALUES\s*\(([^()]+)\))?\s*/ui;

            if (!regex.test(command)) {
                execError('Invalid format for insert command');
            }

            const insertMatch = command.match(regex);

            return {command, commandMatch: insertMatch};


        case 'DESCRIBE':

            const describeElement = commandParts[1];

            if (commandParts.length < 2) {
                execError('Not enough arguments for the DESCRIBE command.');
            }

            if (commandParts.length > 3) {
                execError('2 arguments expected (database or table name) but got: ' + (commandParts.length - 1).toString());
            }

            switch (describeElement.toUpperCase()) {
                case 'DATABASE':
                case 'TABLE':
                    return {command};
                
                default:
                    execError('Element: ' + describeElement + ' does not support the DESCRIBE command.');
            }


        case 'FIND':

            const findRegex = /^\s*FIND\s+((?:DISTINCT\s+)?)((?:\*|[\w.\s,]+)?)\s+IN\s+(\w+)\s*((?:INNER\s+JOIN\s+\w+\s+(?:ON\s+(?:\w+\.\w+|\w+)\s*=\s*(?:\w+\.\w+|\w+)\s*)*)*)(?:\s*WHERE\s+((?:\w+\.\w+|\w+))\s*((?:=|!=|>|<|>=|<=|\s+LIKE\s+|\s+NOT\s+LIKE\s+|IN|\s+NOT\s+IN\s+))\s*((?:\(\s*['"]?[\w\s,]+['"]?(?:\s*,\s*['"]?[\w\s,]+['"]?|\d*\.?\d*)*\s*\)|(?:\s*['"]?[%]?[\w]+[%]?['"]?|\d*\.?\d*))?))?\s*(?:ORDER\s+BY\s+((?:\w+\.\w+|\w+))\s*)?((?:ASC|DESC|))?\s*(?:LIMIT\s+(\d+))?\s*(?:OFFSET\s+(\d+))?$/ui;

            if (!findRegex.test(command)) {
                execError('Invalid format for finding command');
            }

            const findMatch = command.match(findRegex);

            return {command, commandMatch: findMatch};

        case 'DELETE':

        const deleteRegex = /^DELETE\s*FROM\s*(\w+)\s*WHERE\s*(\w+)\s*((?:=|!=|>=|<=|>|<|LIKE|NOT LIKE|IN|NOT IN))\s*((?:\(\s*['"]?[\w\s,]+['"]?(?:\s*,\s*['"]?[\w\s,]+['"]?|\d*\.?\d*)*\s*\)|(?:\s*['"]?[%]?[\w\s,]+[%]?['"]?|\d*\.?\d*)))$/ui;

            if (!deleteRegex.test(command)) {
                execError('Invalid format for delete command');
            }

            const deleteMatch = command.match(deleteRegex);

            return {command, commandMatch: deleteMatch};

        case 'UPDATE':

            const updateRegex = /^UPDATE\s+(\w+)\s+SET\s+(\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^'",]*)(?:\s*,\s*\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^'",]*)|\d*\.?\d*)*)\s*WHERE\s*(\w+)\s*((?:=|!=|>=|<=|>|<|LIKE|NOT LIKE|IN|NOT IN))\s*((?:\(\s*['"]?[\w\s,]+['"]?(?:\s*,\s*['"]?[\w\s,]+['"]?|\d*\.?\d*)*\s*\)|(?:\s*['"]?[%]?[\w\s,]+[%]?['"]?|\d*\.?\d*)))/ui;

            if (!updateRegex.test(command)) {
                execError('Invalid format for update command');
            }

            const updateMatch = command.match(updateRegex);

            return {command, commandMatch: updateMatch};

        default:
            execError('Invalid command action: "' + action + '"')
    }

}

function execError(error) {
    throw new Error(`You have an error on your command syntax: ${error}`);
}
