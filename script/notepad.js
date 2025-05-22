document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('saveBtn').addEventListener('click', function (e) {
        e.stopPropagation();  // ← Évite que le clic remonte à un lien parent
        e.preventDefault();   // ← Empêche le comportement par défaut si jamais (utile par sécurité)

        const text = document.getElementById('noteArea').value;
        const title = document.getElementById('noteTitle').value;
        const now = new Date();
        const timestamp = now.toLocaleDateString('fr-FR').replace(/\//g, '') + '_' + 
                          now.toTimeString().slice(0, 5).replace(':', '-');
        const filename = `${title}__${timestamp}.txt`;

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    });

    document.addEventListener('keydown', function (e) {
        // Windows/Linux : Ctrl+S
        // Mac : Meta+S (Meta = Cmd sur Mac)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault(); // empêche le comportement par défaut du navigateur (enregistrer la page)
            document.getElementById('saveBtn').click(); // déclenche le bouton save
        }
    });

    document.getElementById("noteTitle").addEventListener("change", function () {
        // Retire le focus dès qu'un titre est sélectionné
        this.blur();
    });

    document.getElementById('readBtn').addEventListener('click', function () {
        const fileInput = document.getElementById('fileInput');

        if (fileInput.files.length === 0) {
            alert("Aucun fichier sélectionné.");
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            document.getElementById('noteArea').value = text;
        };

        reader.readAsText(file);
    });
});