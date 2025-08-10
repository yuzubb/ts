document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminal-body');
    const commandInput = document.getElementById('command-input');

    const commands = {
        'help': "Available commands: 'help', 'echo [text]', 'clear', 'about'",
        'about': "This is a simple web-based terminal created for demonstration purposes.",
        'clear': () => {
            terminalBody.innerHTML = '';
        },
        'echo': (args) => {
            return args.join(' ');
        }
    };

    function addLine(text, isInput = false) {
        const line = document.createElement('p');
        if (isInput) {
            line.innerHTML = `<span class="prompt">guest@web-terminal:~$</span> ${text}`;
        } else {
            line.textContent = text;
        }
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const commandText = commandInput.value.trim();
            if (commandText === '') {
                addLine('');
                commandInput.value = '';
                return;
            }

            addLine(commandText, true);

            const parts = commandText.split(' ');
            const command = parts[0].toLowerCase();
            const args = parts.slice(1);

            if (commands[command]) {
                const result = commands[command];
                if (typeof result === 'function') {
                    if (command === 'clear') {
                        result();
                    } else {
                        addLine(result(args));
                    }
                } else {
                    addLine(result);
                }
            } else {
                addLine(`-bash: ${command}: command not found`);
            }

            commandInput.value = '';
        }
    });
});
