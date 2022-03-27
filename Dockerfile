FROM denoland/deno:1.13.2
ADD . /simple-crud/
WORKDIR /simple-crud/
RUN deno install -f --allow-read --allow-write --allow-run -n mandarine https://deno.land/x/mandarinets/cli.ts
EXPOSE 8080
CMD [ "mandarine", "run" ]