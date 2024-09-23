const apiKey = '6b95a692';

$(document).ready(function() {
    // Klik search button
    $('#searchButton').on('click', function() {
        runSearch();
    });

    // Enter input search
    $('#title').on('keypress', function(event) {
        if (event.key === 'Enter') {
            runSearch();
        }
    });
});

function runSearch() {
    const title = $('#title').val();
    const type = $('#type').val();

    if (!title) {
        alert("Brak tytułu");
        return;
    }

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}&type=${type}`;

    $.getJSON(url, function(data) {
        if (data.Response === "True") {
            showResults(data.Search);
        } else {
            alert(data.Error);
            clearTable();
        }
    }).fail(function() {
        alert("Błd pobierania danych");
    });
}

function showResults(results) {
    const tbody = $('#resultsBody');
    tbody.empty(); // Wyczyść wyniki

    results.forEach(function(item) {
        const row = $('<tr></tr>');

        const titleCell = $('<td></td>').text(item.Title);
        const yearCell = $('<td></td>').text(item.Year);
        const typeCell = $('<td></td>').text(item.Type);

        const posterCell = $('<td></td>');
        const posterImg = $('<img>').attr('src', item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/100x150?text=No+Image")
                                    .attr('alt', `${item.Title} Poster`)
                                    .css('width', '100px');
        posterCell.append(posterImg);

        row.append(titleCell, yearCell, typeCell, posterCell);
        tbody.append(row);
    });

    $('#resultsWrapper').show();
}

function clearTable() {
    $('#resultsBody').empty();
    $('#resultsWrapper').hide();
}