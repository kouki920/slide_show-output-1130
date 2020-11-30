'use strict';

const images = [ //7枚の画像を扱う為に配列を作る
  'images/image000.jpg',
  'images/image001.jpg',
  'images/image002.jpg',
  'images/image003.jpg',
  'images/image004.jpg',
  'images/image005.jpg',
  'images/image006.jpg',
];

let currentIndex = 0; //一つを選ぶとその画像が大きくなるシステムを作る時、画像の順番を把握する変数

const mainImage = document.getElementById('carousel__main'); //メインの画像のエリアを取得
mainImage.src = images[currentIndex]; /*上の記述でimgタグの要素を取得している為imgタグが持っていいいる属性を決めることができる
.srcで画像のありかを示す*/
//現在選ばれている場所に応じた画像の場所が設定される
//console.log(mainImage.src);

// forEach for of //配列を扱う方法 forEach for of
for( let [index, image] of images.entries()){ // 何番目の画像が取得されたかをが把握するためにentriesメソッドを使う
 // console.log(index, image);  //letで囲んだ中に配列のインデックスとその値を入れる

 //javascriptでhtmlを作成している↓
  const img = document.createElement('img');//imgタグとliタグを作成
  img.src = image; //ここのimageはforofで回転させている画像のこと

  const li = document.createElement('li');//imgタグとliタグを作成
  if (index === currentIndex) {
    li.classList.add('current');
  }

  li.addEventListener('click', () => {
    mainImage.src = image;//大きい画像のソースをクリックした画像の場所に設定している
    mainImage.classList.add('active');//新しくactiveというclassを付けている

    setTimeout(() => { //時間を扱うメソッド
      mainImage.classList.remove('active');//activeclassを消している、
    }, 800); //ミリ秒 1000=1秒 この秒数はSCSSのアニメーションに関係している
    
    const thumbnails = document.querySelectorAll('.carousel__thumbnails > li');
    //サムネイルをセレクターオールで全て取得しつつ
    thumbnails[currentIndex].classList.remove('current');
    //サムネイルのclassを削除しつつ
    currentIndex = index;
    thumbnails[currentIndex].classList.add('current');
    //クリックしたli(画像)だけにcurrentをつける
  });

  li.appendChild(img); //作成したliにimgを付け加えている
  document.querySelector('.carousel__thumbnails').appendChild(li); //取得しつつliを付けている
}
//矢印はforofの中に書けない
const next = document.getElementById('carousel__next');//右側の矢印を取得
next.addEventListener('click', () => {
  let target = currentIndex + 1;//クリックされるとインデックス番号を1つ増やす処理
  if (target === images.length) {//7枚目は存在しないので、インデックス番号0に戻す
    target = 0;
  }
  document.querySelectorAll('.carousel__thumbnails > li')[target].click();//クリックされた時の処理と同じ動きをする
});

const prev = document.getElementById('carousel__prev');
prev.addEventListener('click', () => {
  let target = currentIndex - 1;//クリックしたらインデックス番号を一つ減らす
  if (target < 0) { //0未満になれば要素合計の最大値に戻す、-1は0からインデックス番号が始まる為の処理
    target = images.length - 1;
  }
  document.querySelectorAll('.carousel__thumbnails > li')[target].click();
});

