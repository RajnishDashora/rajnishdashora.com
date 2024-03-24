---
layout: post
title: "How to create APIs in Clojure supporting file upload and data transformation using ring and data.csv"
date: 2019-09-14 21:43:05 +05:30
---

### How to create APIs in Clojure supporting file upload and data transformation using ring and data.csv {.graf .graf--h3 .graf--leading .graf--title name="aeba"}

Few months back, I was working on writing an HTTP endpoint in Clojure. I
had a use case to pass a file with comma separated values over http and
parse the data for further processing. It does make sense to draft notes
at one place.

In Clojure, ring is one of the most common library while working with
HTTP. **What’s
ring?**[Ring](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fring-clojure%2Fring),
yet another library to help build web applications with modular
components abstracting out HTTP implementation details into simpler
APIs.

[Concepts](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fring-clojure%2Fring%2Fwiki%2FConcepts)
in ring are pretty straight forward, you have a request, a response, a
handler for the request and a middleware to enrich the handler. **Sure,
then how to use ring for file upload?**

[File
upload](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fring-clojure%2Fring%2Fwiki%2FFile-Uploads)
over HTTP requires multipart form handling, The wrap-multipart-params
middleware is provided by ring for this purpose. We can use this
middleware and wrap the api handler with wrap-multipart-param
middleware. i.e.

``` {.graf .graf--pre .graf-after--p name="b40c"}
(wrap-multipart-params handler)(wrap-multipart-params handler options)
```

Optional parameter, options should be a map as follows,

``` {.graf .graf--pre .graf-after--p name="171b"}
{:store temp-file-store  ;; a function for storing uploaded files:encoding char-encoding ;; character encoding of parameters }
```

By default, [store
function](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fring-clojure%2Fring%2Fblob%2F1.6.3%2Fring-core%2Fsrc%2Fring%2Fmiddleware%2Fmultipart_params%2Ftemp_file.clj)
is used to manage the temporary files created after upload and delete
every hour. Lets take an example,

We have a file, sample.csv

``` {.graf .graf--pre .graf-after--p name="4889"}
id,name1,foo2,bar
```

This is how we can make a http request using curl to upload this file,

``` {.graf .graf--pre .graf-after--p name="0ba9"}
curl -XPOST  "http://localhost:8010" -F file=@sample.csv
```

The wrap-multipart-param middleware will enrich the request by updating
the value of`file`{.markup--code .markup--p-code} key in
the `:params`{.markup--code .markup--p-code} map of the request. The
`file`{.markup--code .markup--p-code} key now
contains`:tempfile, :content-type, :tempfile, :size`{.markup--code
.markup--p-code} and the request looks like,

``` {.graf .graf--pre .graf-after--p name="766a"}
{... :params  {"file" {:filename     "sample.csv"           :content-type "text/csv"           :tempfile     #object[java.io.File ...]           :size         51}}...}
```

`:tempfile`{.markup--code .markup--p-code} key contains
`java.io.File`{.markup--code .markup--p-code}object which is the
uploaded data of the file and this can be used to perform further
operations.

We can print the file content after reading as follows,

``` {.graf .graf--pre .graf-after--p name="082b"}
(prn (slurp <java.io.File Object>))
```

Now that we have the uploaded file’s data as a
`java.io.File`{.markup--code .markup--p-code} object,**How can we
use**[**data.csv**](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fclojure%2Fdata.csv)**for
creating clojure maps to use comma separated dataset?**

We can now read the file content which is stored
in `:tempfile`{.markup--code .markup--p-code} key as a
`java.io.File`{.markup--code .markup--p-code} object as a
`java.io.BufferedReader`{.markup--code .markup--p-code} object making
use of
[clojure.java.io](https://medium.com/r/?url=https%3A%2F%2Fclojuredocs.org%2Fclojure.java.io)
reader function.

``` {.graf .graf--pre .graf-after--p name="5b57"}
(io/reader (:tempfile (get request-param "file"))
```

Using
[data.csv](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fclojure%2Fdata.csv)
read-csv function we can further read the csv data,

``` {.graf .graf--pre .graf-after--p name="66bd"}
(csv/read-csv reader)
```

This will give us csv-data as,

``` {.graf .graf--pre .graf-after--p name="776c"}
[["id", "name"], ["1", "foo"], ["2", "bar"]] ;; csv-data
```

Now to create map out of this, we can the following function,

``` {.graf .graf--pre .graf-after--p name="9690"}
(defn csv-data->maps [csv-data]  (map zipmap       (->> (first csv-data)            (map keyword)            repeat)       (rest csv-data)))
```

``` {.graf .graf--pre .graf-after--pre name="7606"}
(csv-data->maps csv-data) ;; csv-data to map
```

This outputs to,

``` {.graf .graf--pre .graf-after--p name="8e78"}
[{:id 1 :name "foo"}, {:id 2 :name "bar"}] ;; csv-data-map
```

Further we can use this data to perform transformation and process the
HTTP API response. Using ring middleware and data.csv library it is
super easy to write APIs to handle csv file uploads and perform
operations.

#### References: {.graf .graf--h4 .graf-after--p name="5bdc"}

clojure.java.io :
[https://clojuredocs.org/clojure.java.io](https://medium.com/r/?url=https%3A%2F%2Fclojuredocs.org%2Fclojure.java.io%2Ffile)

Ring concepts :
[https://github.com/ring-clojure/ring/wiki/Concepts](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fring-clojure%2Fring%2Fwiki%2FConcepts)

clojure.data.csv :
[http://clojure.github.io/data.csv/](https://medium.com/r/?url=http%3A%2F%2Fclojure.github.io%2Fdata.csv%2F)


