import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/flowpilot/site";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/flowpilot-data";
import { money } from "@/components/flowpilot/cards";
import { pageMeta } from "@/lib/meta";
export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) =>
    pageMeta(loaderData?.title ?? "Product", "Explore FlowPilot digital automation products."),
  component: ProductDetail,
});
function ProductDetail() {
  const p = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="site-container grid gap-8 pb-24 pt-36 md:grid-cols-2">
        <img
          className="aspect-[16/10] w-full rounded-xl bg-workflow object-cover"
          src={p.image}
          alt={p.title}
        />
        <div>
          <span className="tag">{p.category}</span>
          <h1 className="mt-4 text-4xl font-semibold">{p.title}</h1>
          <p className="mt-4 text-muted-foreground">{p.subtitle}</p>
          <p className="mt-6 text-3xl font-bold">
            {money(p.price)}{" "}
            <del className="text-base font-normal text-muted-foreground">{money(p.oldPrice)}</del>
          </p>
          <p className="mt-6">{p.description}</p>
          <Button className="mt-8" asChild>
            <Link to="/checkout/$slug" params={{ slug: p.slug }}>
              Buy Now
            </Link>
          </Button>
          <h2 className="mt-10 text-xl font-semibold">What’s included</h2>
          <ul className="mt-3 list-inside list-disc text-muted-foreground">
            {p.includes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
