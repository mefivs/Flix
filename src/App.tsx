import React, { useEffect, useState } from 'react';
import './global.scss';
import api from './api';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

interface MovieListProps {
  slug: string,
  title: string,
  items: []
}

function App() {

  const [movieList, setMovieList] = useState<MovieListProps[]>([]);
  const [featuredData, setFeaturedData] = useState<any>(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await api.getHomeList();
      console.log(list);
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await api.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo)
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])
  return (
    <div className="page">
      <Header black={blackHeader} />


      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => {
          return (
            <MovieRow key={key} title={item.title} items={item.items} />
          );
        })}
      </section>

      <footer>
        By Mefius
      </footer>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando..." />
        </div>
      }
    </div>
  );
}

export default App;
