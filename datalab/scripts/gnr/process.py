import json
from nltk import FreqDist
from nltk.tokenize import RegexpTokenizer

with open('../../data/gnr_songs.json') as json_data:
    songs = json.load(json_data)
    
    tokenizer = RegexpTokenizer(r'\w+')
    words = []
    for song in songs:
        words.extend(tokenizer.tokenize(song['lyrics']))
    
    words = [word.lower() for word in words]
    
    total_words = len(words)
    total_different_words = len(set(words))
    avg_words = 1.0*sum([len(tokenizer.tokenize(song['lyrics'])) for song in songs]) / len(songs)
    lexical_diversity = 100.0*len(set(words)) / len(words) 
    one_out_of = 100.0 / lexical_diversity

    print 'Total words: {0}'.format(total_words)    
    print 'Total different words: {0}'.format(total_different_words)
    print 'Avg words per song: {0}'.format(avg_words)
    print 'Lexical diversity {0}'.format(lexical_diversity)
    print '1 out of {0} is unique'.format(one_out_of)

    # Search for song with greatest lexical diversity
    m_song = None
    value = -1.0
    songs_div = []
    for song in songs:
        s_words = tokenizer.tokenize(song['lyrics'])

        if 1.0*len(set(s_words)) / len(words) > value:
            value = 1.0*len(set(s_words)) / len(words)
            m_song = song['song']
        songs_div.append({'song': song['song'], 'diversity': 1.0*len(set(s_words)) / len(s_words)})
    print m_song
    print value*100.0


    long_words = [word for word in words if len(word) > 3]    
    freq_dist = FreqDist(long_words)
    # Generates words for tag cloud
    #for w,c in freq_dist.most_common(30):
    #    print (w + ' ') * c
     
    

    long_words = [word for word in words if len(word) > 5]    
    freq_dist = FreqDist(long_words)
    # Generates words for tag cloud
    #for w,c in freq_dist.most_common(30):
    #    print (w + ' ') * c

    length = [len(word) for word in words]
    freq_dist = FreqDist(length)
    print freq_dist.most_common()

    print [w for w in set(words) if len(w) > 13]

    sorted_songs = sorted(songs_div, key=lambda k : k['diversity']*-1)
    for s in sorted_songs:
        print s
