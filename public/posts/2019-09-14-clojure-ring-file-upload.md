---
title: "Clojure Ring File Upload and Data CSV"
date: "September 14, 2019"
excerpt: "A practical guide to handling file uploads and CSV processing in Clojure using the Ring framework."
---

## Introduction

Few months back, I was working on writing an HTTP endpoint in Clojure. I had a use case to pass a file with comma separated values over http and parse the data for further processing. It does make sense to draft notes at one place.

In Clojure, ring is one of the most common library while working with HTTP.

**What's ring?** 

[Ring](https://github.com/ring-clojure/ring) is yet another library to help build web applications with modular components abstracting out HTTP implementation details into simpler APIs.

[Concepts](https://github.com/ring-clojure/ring/wiki/Concepts) in ring are pretty straight forward: you have a request, a response, a handler for the request and a middleware to enrich the handler.

## File Upload with Ring

[File upload](https://github.com/ring-clojure/ring/wiki/File-Uploads) over HTTP requires multipart form handling. The `wrap-multipart-params` middleware is provided by ring for this purpose. We can use this middleware and wrap the api handler with `wrap-multipart-param` middleware:

```clojure
(wrap-multipart-params handler)
(wrap-multipart-params handler options)
```

The optional parameter, options should be a map as follows:

```clojure
{:store temp-file-store  ;; a function for storing uploaded files
 :encoding char-encoding ;; character encoding of parameters}
```

By default, [store function](https://github.com/ring-clojure/ring/blob/1.6.3/ring-core/src/ring/middleware/multipart_params/temp_file.clj) is used to manage the temporary files created after upload and delete every hour.

### Example

Let's take an example. We have a file, `sample.csv`:

```csv
id,name
1,foo
2,bar
```

This is how we can make a http request using curl to upload this file:

```bash
curl -XPOST  "http://localhost:8010" -F file=@sample.csv
```

The `wrap-multipart-param` middleware will enrich the request by updating the value of `file` key in the `:params` map of the request. The `file` key now contains `:tempfile, :content-type, :tempfile, :size` and the request looks like:

```clojure
{...
 :params  {"file" {:filename     "sample.csv"
           :content-type "text/csv"
           :tempfile     #object[java.io.File ...]
           :size         51}}
...}
```

The `:tempfile` key contains `java.io.File` object which is the uploaded data of the file and this can be used to perform further operations.

We can print the file content after reading as follows:

```clojure
(prn (slurp <java.io.File Object>))
```

## Processing CSV Data

Now that we have the uploaded file's data as a `java.io.File` object, how can we use [data.csv](https://github.com/clojure/data.csv) for creating clojure maps to use comma separated dataset?

We can now read the file content which is stored in `:tempfile` key as a `java.io.File` object as a `java.io.BufferedReader` object making use of [clojure.java.io](https://clojuredocs.org/clojure.java.io) reader function:

```clojure
(io/reader (:tempfile (get request-param "file"))
```

Using [data.csv](https://github.com/clojure/data.csv) `read-csv` function we can further read the csv data:

```clojure
(csv/read-csv reader)
```

This will give us csv-data as:

```clojure
[["id", "name"], ["1", "foo"], ["2", "bar"]] ;; csv-data
```

Now to create map out of this, we can use the following function:

```clojure
(defn csv-data->maps [csv-data]
  (map zipmap
       (->> (first csv-data)
            (map keyword)
            repeat)
       (rest csv-data)))
```

```clojure
(csv-data->maps csv-data) ;; csv-data to map
```

This outputs to:

```clojure
[{:id 1 :name "foo"}, {:id 2 :name "bar"}] ;; csv-data-map
```

## Conclusion

Further we can use this data to perform transformation and process the HTTP API response. Using ring middleware and data.csv library it is super easy to write APIs to handle csv file uploads and perform operations.

## References

- [clojure.java.io](https://clojuredocs.org/clojure.java.io/file)
- [Ring concepts](https://github.com/ring-clojure/ring/wiki/Concepts)
- [clojure.data.csv](http://clojure.github.io/data.csv/)
