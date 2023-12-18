import { supabase } from "supabase";
import Image from "next/image";
import PromoCard from "src/products/components/PromoCard";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function ProductPage({ product }) {
  const supabaseClient = useSupabaseClient()
  const [productContent, setProductContent] = useState(null)

  useEffect(()=>{
    async function getProductContent(){
      const { data: productContent } = await supabaseClient.from('product_content').select('*').eq('id', product.product_content_id).single();
      setProductContent(productContent)
    }

    getProductContent()
  },[supabaseClient])

  console.log(product);

  return (
    <section className="product-section">
      <article className="product">
        <div className="product-wrap">
          {productContent?.download_url &&(
            <a href={`/assets/${productContent.download_url}`} download className="download-link large-button">
              <span className="large-button-text">Download</span>
            </a>
          )}
          <Image
            width={1000}
            height={300}
            src={`/assets/${product.slug}.png`}
            alt={product.name}
          />
        </div>
        <section>
          <header>
            <h3>{product.name}</h3>
          </header>
          <section>
            <div>
              <p>{product.description}</p>
            </div>
          </section>
        </section>
        <section><PromoCard/></section>
      </article>
    </section>
  );
}

//generate /post/1 and /post/2
export async function getStaticPaths() {
  const { data: products, error } = await supabase
    .from("product")
    .select("slug");

  const paths = products.map((product) => ({
    params: {
      slug: product.slug,
    },
  }));

  //console.log(paths)

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;

  const { data: product } = await supabase
    .from("product")
    .select("*")
    .eq("slug", slug)
    .single();

  return {
    props: { product },
  };
}
